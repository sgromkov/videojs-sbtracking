import sendXMLHttpRequest from '../helpers/sendXMLHttpRequest';
import getStickedParams from '../helpers/getStickedParams';

import playerShowTracking from '../tracking/playerShow';
import contentPlayTracking from '../tracking/contentPlay';
import videoStartTracking from '../tracking/videoStart';

/* eslint camelcase: ["error", {properties: "never"}] */

/**
 * Tracker instance.
*/
const sbtracker = {
  /**
   * @param {Player} player
   *        A Video.js player object
   */
  player: null,

  /**
   * @param {Object} [options={}]
   *        A plain object containing options for the plugin
   */
  options: {},

  /**
   * Will return the current version of the player if it exists.
   *
   * @function getPlayerVersion
   * @return {string}
   *          Player version
   */
  getPlayerVersion() {
    return (this.player.hasOwnProperty('VERSION')) ? this.player.VERSION : null;
  },

  /**
   * Set values of the params that should be initialized when loading the player.
   *
   * @function setInitialParams
   */
  setInitialParams() {
    const params = this.options.params;

    if (!params.hasOwnProperty('player_version') || params.player_version === null) {
      params.player_version = this.getPlayerVersion();
    }
  },

  /**
   * Returns updated params with values of the params
   * that should be updated every tracking event.
   *
   * @function getUpdatedParams
   * @return {Object}
   *         params wich should be sends to server.
   */
  getUpdatedParams() {
    const params = this.options.params;

    params.curr_ts = Math.floor(this.player.currentTime());

    return params;
  },

  /**
   * Will send tracking event data to server
   *
   * @function postTrackingEvent
   * @param {string} actionName
   *        Event name
   * @param {Object} individualParams
   *        Event params
   */
  postTrackingEvent(actionName, individualParams = {}) {
    individualParams.action_name = actionName;
    const commonParams = this.getUpdatedParams();
    const data = getStickedParams(commonParams, individualParams);
    const url = this.options.url + '?' + data.join('&');

    sendXMLHttpRequest(url);
  },

  /**
   * Will set event listeners
   *
   * Should be called when tracker is init
   *
   * @function startTracking
   */
  startTracking() {
    playerShowTracking.apply(this);
    contentPlayTracking.apply(this);
    videoStartTracking.apply(this);
  },

  /**
   * Plugin initialization.
   * Should be called when player is ready.
   *
   * @function init
   * @param    {Player} player
   *           A Video.js player object.
   *
   * @param    {Object} [options={}]
   *           A plain object containing options for the plugin.
   */
  init(player, options) {
    this.player = player;
    this.options = options;
    this.setInitialParams();
    this.startTracking();
  }
};

export default sbtracker;
