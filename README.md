# videojs-sbtracking



## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Installation

- [Installation](#installation)
- [Usage](#usage)
  - [`<script>` Tag](#script-tag)
  - [Browserify/CommonJS](#browserifycommonjs)
  - [RequireJS/AMD](#requirejsamd)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
## Installation

```sh
npm install --save videojs-sbtracking
```

## Usage

To include videojs-sbtracking on your website or web application, use any of the following methods.

### `<script>` Tag

This is the simplest case. Get the script in whatever way you prefer and include the plugin _after_ you include [video.js][videojs], so that the `videojs` global is available.

```html
<script src="//path/to/video.min.js"></script>
<script src="//path/to/videojs-sbtracking.min.js"></script>
<script>
  var player = videojs('my-video');

  player.sbtracking({
    params: {
      media_state_code: "",
      media_id: "",
      playeri: "",
      player_version: "",
      has_adblock: "",
      site_owner_id: "",
      main_rubric: "",
      uuid: "",
      uid: ""
    },
    hasAds: false,
    videoUrl: "",
    url: "/sbtracking/vplayer"
  });
</script>
```

### Browserify/CommonJS

When using with Browserify, install videojs-sbtracking via npm and `require` the plugin as you would any other module.

```js
var videojs = require('video.js');

// The actual plugin function is exported by this module, but it is also
// attached to the `Player.prototype`; so, there is no need to assign it
// to a variable.
require('videojs-sbtracking');

var player = videojs('my-video');

player.sbtracking({
  params: {
    media_state_code: "",
    media_id: "",
    playeri: "",
    player_version: "",
    has_adblock: "",
    site_owner_id: "",
    main_rubric: "",
    uuid: "",
    uid: ""
  },
  hasAds: false,
  videoUrl: "",
  url: "/sbtracking/vplayer"
});
```

### RequireJS/AMD

When using with RequireJS (or another AMD library), get the script in whatever way you prefer and `require` the plugin as you normally would:

```js
require(['video.js', 'videojs-sbtracking'], function(videojs) {
  var player = videojs('my-video');

  player.sbtracking({
    params: {
      media_state_code: "",
      media_id: "",
      playeri: "",
      player_version: "",
      has_adblock: "",
      site_owner_id: "",
      main_rubric: "",
      uuid: "",
      uid: ""
    },
    hasAds: false,
    videoUrl: "",
    url: "/sbtracking/vplayer"
  });
});
```

## License

MIT. Copyright (c) Sergey Gromkov &lt;sgromkov@gmail.com&gt;


[videojs]: http://videojs.com/
