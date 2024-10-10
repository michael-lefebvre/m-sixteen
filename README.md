# m-sixteen/ultimate attempt

> Back in time, I was a punker 🤟🧑‍🎤🎸

## Motivation

A static website covering the band career.   
Consider it as the band's enhanced tombstone and a personal playground of the latest trendy APIs and libraries.

**Key features:**

- up to date with the latest libraries versions
- native solutions preferred over third-party libraries, excluding polyfills as much as possible
- deployed on a Github page under a custom domain with deep linking support
- a11y in mind
- dedicated medias hosting and optimized delivery
- content isolated from the code into JSON/MDX files
- responsive layout with a mobile-first approach
- fancy orchestrated pages transitions behind the classics (and boring) cross-fade effect
- measurable performances

## Content 

The website exposes the band's career through a chronological list, where each item has an unique ID, a date, and belongs to one of the following type:

- `concert`: every gig the band performed.
- `discography`: records, compilations, promotional materials.
- `moment`: a highlighted event regardless of his topic
- `video`: a video player consuming various sources like Youtube, Vimeo, etc.
- `visual`: pictures, flyers, posters, etc.

If an URL is provided (including `slug`, `meta`, etc.), the item can be accessed through a dedicated layout associated with a canonical URL.

## Routing

The `window.location.pathname` is the app context source of truth. On update the `pathname` string expose an object with the current `type/slug` pairs.  

- `/` (_home page_)
- `/videos/live-nevers-2007`
- `/moments/first-time-in-berlin` 
- `/moments/shooting-rouge-video/videos/rouge` 
- `/releases/debut-ep` 
- `/releases/split-with-the-missing-23rd/moments/hogsteen-tour-2004` 
- `/releases/self-titled/moments/euro-tour-part-2/videos/feed-by-anger-selencha-serbia`

---

#### Credits and licenses

External resources are credited but some portions of the code might be shameless copy/pasted from not-stable/outdated external resources.  
I tried to respect authorships, feel free to correct me.
