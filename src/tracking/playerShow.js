/**
 * Tracks once when the player is loaded.
 *
 * @function playerShowTracking
 */
const playerShowTracking = function() {
  this.player.one('loadstart', () => {
    this.postTrackingEvent('player_show', {});
    if (this.options.hasAds) {
      document.dispatchEvent(new Event('wjplayerWithAdsLoadstart'));
    }
  });
};

export default playerShowTracking;
