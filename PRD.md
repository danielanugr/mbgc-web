# PRD - Mataram Board Game Website

## Problem Statement

Mataram Board Game adalah komunitas board game yang berdiri sejak Mei 2024 di Kota Mataram. Saat ini, informasi mengenai kegiatan playday, gallery foto, review board game, dan event mendatang hanya tersebar di WhatsApp dan Instagram. Hal ini menyebabkan:

1. Informasi tidak terpusat dan sulit dicari oleh calon anggota baru
2. Gallery foto playday tidak terorganisir dengan baik
3. Review board game tidak memiliki database yang terstruktur
4. Event playday sulit untuk dipromosikan ke audiens yang lebih luas

Website ini akan menjadi pusat informasi terpusat yang memudahkan:

- Calon anggota baru untuk menemukan dan mengenal komunitas
- Anggota eksisting untuk melihat gallery dan dokumentasi kegiatan
- Promosi event playday ke audiens lokal dan internasional (termasuk publisher game)
- Inventory board game yang dimiliki komunitas

## Solution

Website statis yang modern, performant, dan mudah di-maintain dengan spesifikasi berikut:

### Tech Stack

| Layer              | Technology                   | Rationale                                                  |
| ------------------ | ---------------------------- | ---------------------------------------------------------- |
| Frontend Framework | Next.js (App Router)         | Modern, SSR ready, SEO-friendly, great DX                  |
| Styling            | TailwindCSS                  | Utility-first, fast development, easy customization        |
| Headless CMS       | Sanity (Free Tier)           | Unlimited docs/users/calls, 500GB bandwidth, modern Studio |
| Image Storage      | Cloudflare R2                | Cost-effective, global CDN, S3-compatible API              |
| Deployment         | Netlify (Free)               | Native Next.js support, 200GB bandwidth, easy CI/CD        |
| Testing            | Jest + React Testing Library | Industry standard, great DX                                |
| Type Safety        | TypeScript                   | Catch errors at dev time, better IDE support               |

### Design System

| Element       | Value                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------- |
| Primary Color | #162836 (Dark Blue)                                                                                               |
| Accent 1      | #cf7650 (Orange)                                                                                                  |
| Accent 2      | #dba58a (Peach)                                                                                                   |
| Style         | Playful, modern                                                                                                   |
| Dark Mode     | Optional                                                                                                          |
| Font          | Use font that matches the playful yet modern aesthetic (e.g., Poppins, Inter) and not the one that AI usually use |

### Core Features (MVP)

1. **Event Management**
   - Event listing dengan pagination
   - Event detail page dengan lokasi, tanggal, deskripsi
   - Tidak ada filter upcoming/past (semua event ditampilkan)

2. **Gallery System**
   - Gallery per-event (tiap playday punya gallery sendiri)
   - Infinite scroll (load 10 foto per scroll)
   - Lazy loading untuk performance
   - Lightbox untuk zoom image

3. **Board Game Inventory**
   - Grid view dengan nama, publisher, cover image, BGG rating
   - Search functionality untuk mencari game
   - Auto-sync dengan BoardGameGeek API (username: lumiguia)
   - ~35 games saat ini, akan terus bertambah

4. **About Us**
   - Sejarah komunitas (berdiri Mei 2024)
   - Visi & Misi
   - Cara bergabung (Instagram + WhatsApp)
   - Foto team/organizers

5. **Social Media Integration**
   - 3 TikTok videos terbaru (embed manual)
   - 3 Instagram reels terbaru (embed manual)
   - CTA follow @mataram_bg

### Homepage Layout (Top to Bottom)

1. Event terdekat (hero section)
2. Gallery terbaru
3. Video social media (TikTok + Instagram)
4. 3 blog post (post-MVP, out of scope untuk MVP)
5. CTA follow @mataram_bg

### Post-MVP Features (Out of Scope)

- Blog untuk review board game
- User authentication/login
- RSVP/registration system untuk event
- Advanced inventory features (borrowing, maintenance status)
- Category/filtering untuk board game types

## User Flow

### Flow 1: Pengunjung Baru Menemukan Komunitas

```
┌─────────────┐
│ Pengunjung  │
│ buka website│
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────┐
│ Homepage                              │
│ - Lihat event terdekat                │
│ - Scroll gallery terbaru              │
│ - Lihat video TikTok/Instagram        │
└──────┬─────────────────────────────────┘
       │
       ├──────────────────────────────────────┐
       ▼                                      ▼
┌─────────────────┐                  ┌─────────────────────┐
│ Klik About Us  │                  │ Cari board game di  │
│ untuk          │                  │ Inventory Search     │
│ informasi      │                  └─────────┬───────────┘
│ komunitas      │                            │
└───────┬────────┘                            ▼
        │                              ┌─────────────────┐
        ▼                              │ Lihat grid game │
┌────────────────────┐                 │ + BGG rating   │
│ Baca Visi/Misi   │                 └───────┬─────────┘
│ Cara bergabung   │                         │
└───────┬──────────┘                         ▼
        │                            ┌─────────────────┐
        ▼                            │ Follow IG/WA   │
┌─────────────────┐                   │ untuk join     │
│ Join WhatsApp/  │                   └─────────────────┘
│ Instagram       │
└─────────────────┘
```

### Flow 2: Admin Menambahkan Baru

```
┌──────────┐
│ Admin    │
│ login ke │
│ Sanity   │
│ Studio   │
└────┬─────┘
     │
     ▼
┌─────────────────────────────────────────┐
│ Sanity Dashboard                      │
└──────┬─────────────────────────────────┘
       │
       ├──────────┬──────────┬──────────┐
       ▼          ▼          ▼          ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Buat     │ │ Upload   │ │ Edit     │ │ Update   │
│ Event    │ │ Gallery  │ │ About    │ │ TikTok/  │
│ Baru     │ │ Foto     │ │ Content  │ │ IG Embed │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
       │          │          │          │
       └──────────┴──────────┴──────────┘
                    │
                    ▼
           ┌────────────────┐
           │ Auto-deploy ke │
           │ Netlify       │
           └────────────────┘
```

### Flow 3: BGG Auto-Sync (Background)

```
┌─────────────────┐
│ System/Manual   │
│ Trigger Sync    │
└────┬────────────┘
     │
     ▼
┌─────────────────────────────┐
│ BGG Service                │
│ - Fetch collection XML      │
│ - Parse game data          │
│ - Transform to Sanity format│
└────┬──────────────────────┘
     │
     ▼
┌─────────────────────────────┐
│ Upsert ke Sanity           │
│ BoardGame documents        │
└────┬──────────────────────┘
     │
     ▼
┌─────────────────────────────┐
│ Website auto-update        │
│ (cache invalidation)      │
└─────────────────────────────┘
```

## Implementation Decisions

### Module Architecture

#### Core & Infrastructure

1. **Project Setup**
   - Next.js 15+ with App Router
   - TypeScript strict mode
   - TailwindCSS v3+
   - ESLint + Prettier
   - Netlify config for deployment

2. **Sanity Client**
   - @sanity/client untuk queries
   - @sanity/image-url untuk image URL generation
   - Type generation from Sanity schema
   - GROQ query utilities

3. **R2 Storage Integration**
   - @aws-sdk/client-s3 untuk R2 operations
   - Upload logic untuk gallery images
   - CDN URL generation
   - Environment-based configuration

#### Content Modules

4. **Sanity Schema**
   - Event document: title, date, location, description, image (inline)
   - Gallery document: eventReference (→ Event), images (array)
   - BoardGame document: name, publisher, coverImage, bggId, bggRating
   - About document: content (portable text)
   - Blog document: (post-MVP)

5. **BGG Integration Service** (DEEP MODULE - Unit Tested)
   - Fetch collection from BoardGameGeek XML API
   - Parse XML to typed objects
   - Transform to Sanity document format
   - Handle rate limiting and errors
   - Upsert logic (create/update existing games)

6. **Image Processing**
   - Responsive image generation via Sanity Image Builder
   - Lazy loading with intersection observer
   - Next.js Image component for optimization
   - Fallback handling

#### Feature Modules

7. **Event Module**
   - Event listing page with pagination (10 events per page)
   - Event detail page
   - Date formatting (Bahasa Indonesia)
   - Location display

8. **Gallery Module**
   - Per-event gallery page
   - Infinite scroll with 10 images per batch
   - Lightbox implementation (yet-another-react-lightbox)
   - Swipe gestures support

9. **Inventory Module**
   - Grid layout (responsive)
   - Real-time search filter
   - BGG rating display (star or numeric)
   - Publisher name

10. **About Module**
    - Static content page from Sanity portable text
    - Portable text rendering with @portabletext/react
    - CTA buttons for IG/WA

11. **Social Embed Module**
    - Manual embed component for TikTok
    - Manual embed component for Instagram
    - Component props for URLs (easily editable)
    - Responsive embed containers

12. **SEO Module** (DEEP MODULE - Unit Tested)
    - Meta tag generation per page
    - Open Graph tags
    - Twitter Card tags
    - Sitemap.xml generation
    - JSON-LD structured data for Events and BoardGames

### Page Structure

| Route                | Purpose              | Data Source                                     |
| -------------------- | -------------------- | ----------------------------------------------- |
| `/`                  | Homepage             | Event terdekat, Gallery terbaru, TikTok/IG URLs |
| `/event`             | Event listing        | Sanity Event docs                               |
| `/event/[slug]`      | Event detail         | Sanity Event doc                                |
| `/gallery/[eventId]` | Gallery per event    | Sanity Gallery doc                              |
| `/inventory`         | Board game inventory | Sanity BoardGame docs + search                  |
| `/about`             | About us             | Sanity About doc                                |
| `/blog`              | Blog listing         | Sanity Blog docs (post-MVP)                     |
| `/blog/[slug]`       | Blog detail          | Sanity Blog doc (post-MVP)                      |

### API Routes (Next.js)

| Route           | Purpose                      | Method |
| --------------- | ---------------------------- | ------ |
| `/api/sync-bgg` | Trigger BGG sync manually    | POST   |
| `/api/upload`   | Upload image to R2           | POST   |
| `/api/search`   | Search inventory (debounced) | GET    |

### Sanity Schema Details

#### Event

```typescript
{
  _type: "event",
  title: string,
  slug: { current: string },
  date: datetime,
  location: string,
  description: portableText,
  image: image, // inline field
}
```

#### Gallery

```typescript
{
  _type: "gallery",
  title: string,
  slug: { current: string },
  event: reference, // → Event
  images: image[], // array, stored in R2
}
```

#### BoardGame

```typescript
{
  _type: "boardGame",
  name: string,
  slug: { current: string },
  publisher: string,
  coverImage: image,
  bggId: number,
  bggRating: number,
}
```

#### About

```typescript
{
  _type: "about",
  title: string,
  content: portableText,
}
```

### BGG API Integration

- Endpoint: `https://boardgamegeek.com/xmlapi2/collection?username=lumiguia&stats=1`
- Response: XML collection dengan game details + ratings
- Data yang di-fetch: name, publisher, thumbnail, image, geek rating
- Sync frequency: Manual trigger via API route (future: cron job)
- Cache duration: 1 minggu (7 hari) untuk reduce API requests
- Error handling:
  - Retry logic dengan exponential backoff (1s → 2s → 4s → 8s)
  - Polling untuk status 202 (wait 3s, max 10 attempts)
  - Jika BGG down/telah max retry: Tampilkan data stale dari cache
- Rate limiting solution:
  - Client-side rate limiter: 1 request per 1.2 detik (lebih aman dari 1s BGG)
  - Add jitter ke retry delay untuk avoid thundering herd
  - Handle responses:
    - `200 OK`: Success, parse XML
    - `202 Accepted`: Wait 3s lalu retry (BGG memproses di background)
    - `429 Too Many Requests`: Wait dengan exponential backoff
    - `Timeout/Error`: Retry dengan exponential backoff

### Image Handling Strategy

- Gallery images: Upload to R2, store URL in Sanity
- Event images: Store di Sanity hosted images
- Board game covers: Fetch dari BGG thumbnail/image URLs
- Responsive sizes: Generate via Sanity Image Builder
- Lazy loading: Intersection Observer API

### Color Palette & Tailwind Config

```javascript
theme: {
  colors: {
    primary: '#162836',
    accent1: '#cf7650',
    accent2: '#dba58a',
  }
}
```

### Deployment Strategy

- Netlify free tier (200GB bandwidth/month)
- Netlify subdomain: mataram-board-game.netlify.app
- Automatic deploy on push to main branch
- Environment variables via Netlify dashboard
- Future: Custom domain (user belum punya)

## Testing Decisions

### Testing Philosophy

- **Unit tests only** - Test pure functions and business logic in isolation
- **No integration/E2E** - Focus on deep modules with clear interfaces
- **External behavior over implementation** - Test what, not how

### Modules to Unit Test

| Module                  | Test Focus                                         | Priority |
| ----------------------- | -------------------------------------------------- | -------- |
| **BGG Service**         | XML parsing, data transformation, error handling   | HIGH     |
| **SEO Module**          | Meta tag generation, Open Graph, JSON-LD structure | HIGH     |
| **Query Builder**       | GROQ query construction, type safety               | MEDIUM   |
| **Image URL Generator** | Sanity image URL building, responsive variants     | MEDIUM   |
| **Date Formatter**      | Indonesian date formatting, edge cases             | LOW      |

### Test Framework & Tools

- **Jest** - Test runner
- **React Testing Library** - Component testing (if needed)
- **@testing-library/react** - React component utilities
- **ts-jest** - TypeScript support

### Test Coverage Goals

- Deep modules (BGG Service, SEO): 80%+
- Utility functions: 90%+
- Components: Minimal (focus on deep modules)

### Prior Art

- Jest best practices for unit testing
- React Testing Library guidelines for component testing
- TDD pattern for business logic (red-green-refactor)

## Out of Scope

### MVP Exclusions

1. **Blog System** - Review board game, blog posts
2. **User Authentication** - Login, user accounts
3. **RSVP/Registration** - Event signup system
4. **Advanced Inventory Features** - Borrowing system, maintenance status
5. **Category/Filtering** - Board game categories, complexity filters
6. **User-generated Content** - Gallery uploads by members
7. **Comment System** - Comments on events, reviews
8. **Recommendation Engine** - Game suggestions based on preferences
9. **Newsletter** - Email subscription
10. **Multi-language** - Support selain Bahasa Indonesia

### Technical Exclusions

1. **API Authentication** - Public content only, no protected routes
2. **Database** - Sanity sebagai single source of truth
3. **Real-time Features** - WebSockets, live updates
4. **Payment Integration** - Ticket booking, payments
5. **Advanced Analytics** - Custom tracking beyond basic GA
6. **A/B Testing** - Feature flags, experiments
7. **Internationalization (i18n)** - Multi-language support
8. **Server-side Cache** - Redis, Memcached (rely on Netlify CDN)

## Further Notes

### Timeline

- **Target Launch**: 3 minggu
- **Dev Time**: 21 jam/minggu
- **MVP Scope**: Sanity integration, Event, Gallery, About, Inventory
- **Post-MVP**: Blog system

### Implementation Order (Tracer Bullet Approach)

**Week 1: Core Setup**

1. Next.js + TypeScript + TailwindCSS setup
2. Sanity project creation + schema deployment
3. Sanity client configuration
4. R2 storage setup
5. Netlify deployment configuration

**Week 2: Core Features**

1. BGG service implementation (unit tests)
2. Sanity queries for Event, Gallery, BoardGame, About
3. Event listing + pagination
4. Event detail page
5. Gallery per-event with infinite scroll
6. Lightbox integration

**Week 3: Polish & Integration**

1. Inventory search + grid view
2. About page with portable text
3. Social embed components (TikTok/Instagram)
4. SEO module (meta tags, sitemap, JSON-LD)
5. Homepage assembly
6. Responsive design polish
7. Accessibility audit
8. Performance optimization
9. Deploy to Netlify

### Content Migration

- Initial Event data: Create sample events in Sanity
- Initial Gallery: Upload first playday photos
- About content: Use provided text (Visi/Misi/Cara Bergabung)
- Board games: Auto-sync from BGG (username: lumiguia)
- Social embed: Prepare TikTok/IG URLs for manual embed

### Known Risks & Mitigations

| Risk                       | Mitigation                                                                                                                                      |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| BGG API rate limiting      | Exponential backoff, client-side rate limiter (1.2s/request), polling untuk status 202, 1-week cache, fallback ke stale data jika BGG down |
| R2 upload failures         | Fallback to Sanity hosted images                                                                                                                 |
| Gallery performance        | Lazy loading + pagination, CDN via R2                                                                                                           |
| Large image sizes          | Sanity Image Builder for responsive variants                                                                                                    |
| Netlify bandwidth exceeded | Monitor usage, optimize images, upgrade if needed                                                                                                 |

### Success Metrics (Post-Launch)

- Page load time < 2s on 3G
- Lighthouse score > 90
- SEO indexability for "board game mataram" keywords
- Gallery infinite scroll smooth 60fps
- Search latency < 500ms

### Future Enhancements (Post-MVP)

1. Blog system untuk review board game
2. BGG sync automation via cron job
3. Advanced search dengan filter (publisher, rating)
4. Image gallery dengan tagging
5. Event calendar view
6. User accounts + favorites
7. Comment system pada events/gallery
8. Newsletter integration
9. Dark mode toggle
10. Custom domain setup

---

**Document Version**: 1.1
**Last Updated**: 2026-03-22
**Author**: Mataram Board Game Team
**Changes in v1.1**:
- Updated BGG API Integration section with detailed rate limiting solution
- Added cache duration: 1 week (7 days)
- Added error handling: stale data fallback if BGG is down
- Updated Known Risks table with detailed BGG rate limiting mitigation
