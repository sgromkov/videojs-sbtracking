/**
 * Create XMLHttpRequest and send json data to server.
 *
 * @function sendXMLHttpRequest
 * @param {string} url
 *        Page url
 */
const sendXMLHttpRequest = function(url) {
  const xhr = new XMLHttpRequest();

  xhr.open('POST', url, true);
  xhr.withCredentials = true;
  xhr.send(null);
};

export default sendXMLHttpRequest;
