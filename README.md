# m-sixteen

## TODO

- [ ] Hosting
  - [x] [Single Page Apps for GitHub Pages](https://github.com/rafrex/spa-github-pages)
  - [ ] [Custom domains on GitHub Pages with HTTPS](https://github.blog/2018-05-01-github-pages-custom-domains-https/)
- [ ] Responsives
  - [ ] Home
  - [ ] Videos
  - [ ] Releases
    - [ ] Album
    - [ ] Split
    - [ ] EP
- [ ] Perf
  - [ ] [Resource Prioritization](https://developers.google.com/web/fundamentals/performance/resource-prioritization)
  - [ ] Images/Photos:
    - [ ] automatic resizing script
    - [ ] find a CDN


### Notes

https://stackoverflow.com/questions/54211030/how-do-i-import-modernizr-in-react
https://www.npmjs.com/package/css-mediaquery
[force css grid container to fill full screen of device](https://stackoverflow.com/a/43747245)
[Intro to State Machines and XState](https://github.com/kyleshevlin/intro-to-state-machines-and-xstate-course/tree/master/lessons)
[Contester une revendication Content ID](https://support.google.com/youtube/answer/2797454?hl=fr)
https://www.believemusic.com/fr/video-questions-legales-contact-fr/
[Modern client-side routing: the Navigation API](https://developer.chrome.com/docs/web-platform/navigation-api/)

## App States

```
{
  viewportBreakpoint,
  homeBkgdVideoState: notApplicable | canPlay | loading | playing | pause,
  routeTransition: {    
    from
    to
  },
  route: {
    current:
    previous:
    next:
  }
  view: {
    state: unmounted | loading | entering | mounted | leaving
    params
  }
}
```


## Compress Home background video

[YouTube API iFrame](https://developers.google.com/youtube/player_parameters#modestbranding)
[Best Practices for Background Videos](https://www.viget.com/articles/best-practices-for-background-videos/)

```
./ffmpeg -i msixteen_home.mp4 -c:v libvpx-vp9 -an -b:v 1000k -s hd720 output-1000k.webm
./ffmpeg -i msixteen_home.mp4 -c:v libvpx-vp9 -an -b:v 500k -s hd720 output-500k.webm
./ffmpeg -i msixteen_home.mp4 -c:v libx264 -an -b:v 500k -s hd720 output-500k.mp4
```

### Detect if Home Video ok

[Efficiently detect if a device will play silent videos that have the autoplay attribute](https://stackoverflow.com/a/44452458)
[HTML5 Video Background not playing Safari on iPhone](https://stackoverflow.com/a/59438421)
