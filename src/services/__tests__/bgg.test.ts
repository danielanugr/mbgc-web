import { fetchBGGCollection, syncToSanity } from "../bgg";
import { getWriteClient } from "@/sanity/client";

// Mock deps
jest.mock("@/sanity/client", () => ({
  getWriteClient: jest.fn(),
}));

// Mock valid BGG XML Response
const validXMLResponse = `
<items totalitems="2" termsofuse="https://boardgamegeek.com/xmlapi/termsofuse" pubdate="Wed, 27 Mar 2024 14:00:00 +0000">
  <item objecttype="thing" objectid="123" subtype="boardgame" collid="1">
    <name sortindex="1">Test Game 1</name>
    <yearpublished>2020</yearpublished>
    <image>https://example.com/image1.jpg</image>
    <thumbnail>https://example.com/thumb1.jpg</thumbnail>
    <stats minplayers="2" maxplayers="4" minplaytime="30" maxplaytime="60" playingtime="60" numowned="1">
      <rating value="N/A">
        <usersrated value="100"/>
        <average value="7.5"/>
        <bayesaverage value="6.5"/>
      </rating>
    </stats>
  </item>
  <item objecttype="thing" objectid="456" subtype="boardgame" collid="2">
    <name sortindex="1">Test Game 2</name>
    <yearpublished>2021</yearpublished>
    <stats minplayers="1" maxplayers="2" minplaytime="15" maxplaytime="30" playingtime="30" numowned="1">
      <rating value="N/A">
        <average value="8.0"/>
      </rating>
    </stats>
  </item>
</items>
`;

describe("BGG Service", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;
    jest.clearAllMocks();
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  describe("fetchBGGCollection", () => {
    it("should successfully parse XML to array of games", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        text: jest.fn().mockResolvedValue(validXMLResponse),
      } as unknown as Response);

      const games = await fetchBGGCollection();

      expect(games).toHaveLength(2);
      expect(games[0]).toEqual({
        bggId: 123,
        name: "Test Game 1",
        image: "https://example.com/image1.jpg",
        thumbnail: "https://example.com/thumb1.jpg",
        yearpublished: 2020,
        rating: 7.5,
      });
      expect(games[1].name).toBe("Test Game 2");
      expect(games[1].image).toBe(""); // Not provided in XML
      expect(games[1].rating).toBe(8.0);
    });

    it("should handle empty collection correctly", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        text: jest.fn().mockResolvedValue("<items></items>"),
      } as unknown as Response);

      const games = await fetchBGGCollection();
      expect(games).toHaveLength(0);
    });

    it("should wait and retry on 202 status", async () => {
      let callCount = 0;
      global.fetch = jest.fn().mockImplementation(() => {
        callCount++;
        if (callCount === 1) {
          return Promise.resolve({
            status: 202,
            text: jest.fn().mockResolvedValue("Please wait."),
          });
        }
        return Promise.resolve({
          status: 200,
          text: jest.fn().mockResolvedValue(validXMLResponse),
        });
      });

      const games = await fetchBGGCollection();
      expect(callCount).toBe(2);
      expect(games).toHaveLength(2);
    });
  });

  describe("syncToSanity", () => {
    it("should process and sync games", async () => {
      // Setup fetch mock
      global.fetch = jest.fn().mockResolvedValue({
        status: 200,
        text: jest.fn().mockResolvedValue(validXMLResponse),
      } as unknown as Response);

      // Setup sanity mock
      const mockFetch = jest.fn().mockResolvedValue(null); // No existing doc
      const mockCreate = jest.fn().mockResolvedValue({ _id: "new-doc-id" });
      const mockPatch = jest.fn(() => ({
        set: jest.fn().mockReturnThis(),
        commit: jest.fn().mockResolvedValue(true),
      }));

      (getWriteClient as jest.Mock).mockReturnValue({
        fetch: mockFetch,
        create: mockCreate,
        patch: mockPatch,
      });

      const result = await syncToSanity();

      expect(result.success).toBe(true);
      expect(result.results?.added).toBe(2);
      expect(result.results?.updated).toBe(0);
      expect(result.results?.errors).toHaveLength(0);

      expect(mockCreate).toHaveBeenCalledTimes(2);
      expect(mockCreate).toHaveBeenCalledWith(
        expect.objectContaining({
          _type: "boardGame",
          name: "Test Game 1",
          bggId: 123,
          bggRating: 7.5,
        }),
      );
    });
  });
});
