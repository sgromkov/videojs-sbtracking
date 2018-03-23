/**
 * Tracks once when the content starts to play.
 *
 * @function contentPlayTracking
 */
const contentPlayTracking = function() {
  this.player.one('play', () => {
    this.postTrackingEvent('content_play', {file: this.options.videoUrl || null});
  });
};

export default contentPlayTracking;
