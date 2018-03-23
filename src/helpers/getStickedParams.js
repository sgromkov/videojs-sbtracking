/**
 * Will return glue encode params.
 *
 * @function getStickedParams
 * @param {Object} commonParams
 *        Plugin common params from options.params
 * @param {Object} individualParams
 *        Event individual params
 * @return {Array}
 *          Glue encode params
 */
const getStickedParams = function(commonParams = {}, individualParams = {}) {
  const params = Object.assign({}, commonParams, individualParams);
  const data = [];

  for (const key in params) {
    if (params.hasOwnProperty(key) && params[key] !== null) {
      data.push(key + '=' + encodeURIComponent(params[key]));
    }
  }

  return data;
};

export default getStickedParams;
