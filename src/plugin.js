import videojs from 'video.js';
import {version as VERSION} from '../package.json';

// Default options for the plugin.
const defaults = {};

// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Class representing an sbtracking plugin
 */
class Sbtracking {
  /**
   * Plugin initialization
   *
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */
  constructor(player, options) {
    this.player = player;
    this.options = options;
    this.events = [];
    this.initialTime = 0;
    this.initialTimeInterval = null;
  }

  setInitialTime() {
    this.initialTime = Math.floor(this.player.currentTime());
  }

  videoStarted() {
    const player = this.player;
    const currentTime = Math.floor(player.currentTime());
    const initialTime = this.initialTime;

    return (currentTime >= initialTime + 3);
  }

  videoStartEventChecker() {
    this.initialTimeInterval = setInterval(() => {
      const player = this.player;
      let additionalParams;
      let duration = null;
      const currentTime = Math.floor(player.currentTime());

      if (this.videoStarted()) {
        clearInterval(this.initialTimeInterval);

        duration = player.duration();
        if (!isFinite(duration)) {
          duration = -2;
        }

        additionalParams = {
          dur: duration,
          curr_ts: currentTime
        };

        this.postTrackingEvent('video_start', additionalParams);
      }
    
    }, 1000);
  }

  /**
   * Will send tracking event data to server
   *
   * @function postTrackingEvent
   * @param {string} name
   *        Event name
   * @param {Object} params
   *        Event params
   */
  postTrackingEvent(name, params) {
    if (!name.match(/buffer/i) && (typeof this.events[name] !== 'undefined')) {
      return;
    }

    if (typeof params !== 'object') {
      videojs.log('action_params must be an object');
      return;
    }

    const optionsParams = this.options.params || {};
    const urlParams = [];
    const flashVersion = (typeof swfobject !== 'undefined') ?
      swfobject.getFlashPlayerVersion().major : -1;
    const playerVersion = (this.player.hasOwnProperty('VERSION')) ? 
      this.player.VERSION : '';

    urlParams.push('action_name=' + encodeURIComponent(name));
    urlParams.push('from=' + encodeURIComponent(document.referrer));

    for (const key in optionsParams) {
      if (optionsParams.hasOwnProperty(key) && optionsParams[key] !== null) {
        const param = key + '=' + encodeURIComponent(optionsParams[key]);

        urlParams.push(param);
      }
    }

    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const param = key + '=' + encodeURIComponent(params[key]);

        urlParams.push(param);
      }
    }

    urlParams.push('flash_version=' + encodeURIComponent(flashVersion));
    urlParams.push('player_version=' + encodeURIComponent(playerVersion));

    const url = this.options.url + '?' + urlParams.join('&');

    if (window.XDomainRequest) {
      const xdr = new XDomainRequest();

      xdr.open('POST', url);
      xdr.send(null);
    } else {
      const xmlhttp = new XMLHttpRequest();

      xmlhttp.open('POST', url, true);
      xmlhttp.send(null);
    }

    this.events[name] = 1;
  }

  /**
   * Function to invoke when the player is ready.
   *
   * When this function is called, the player
   * will have its DOM and child components in place.
   *
   * @function ready
   */
  ready() {
    videojs.log('sbtracking Plugin ENABLED!', this.options);

    this.player.addClass('vjs-videojs-sbtracking');

    this.player.on('loadstart', () => {
      this.postTrackingEvent('player_show', {});
      if (this.options.hasAds) {
        document.dispatchEvent(new Event('wjplayerWithAdsLoadstart'));
      }
    });

    this.player.one('play', () => {
      this.postTrackingEvent('content_play', {file: this.options.videoUrl});

      this.setInitialTime();
      this.videoStartEventChecker();
    });
  }
}

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function sbtracking
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
const sbtracking = function(options) {
  const tracker = new Sbtracking(this, videojs.mergeOptions(defaults, options));

  tracker.ready();
};

// Register the plugin with video.js.
registerPlugin('sbtracking', sbtracking);

// Include the version number.
sbtracking.VERSION = VERSION;

export default sbtracking;
