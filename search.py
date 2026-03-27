import urllib.request, urllib.parse, json

req = urllib.request.Request(
    'https://html.duckduckgo.com/html/?q=' + urllib.parse.quote('bgg xmlapi2 unauthorized see'),
    headers={'User-Agent': 'Mozilla/5.0'}
)
html = urllib.request.urlopen(req).read().decode('utf-8')
import re
text = re.sub('<[^<]+>', '', html)
import textwrap
print("\n".join(t for t in text.split("\n") if "401" in t or "unauthorized" in t.lower() or "bgg" in t.lower() or "xml" in t.lower()))
