// const fetch = require('node-fetch');
const axios = require('axios')
const ApiError = require('./ApiError');

// function fetchRetry(url, options = {}, retries = 5, backoff = 300) {

//   const retryCodes = [408, 500, 502, 503, 504, 522, 524]
//   // 408 - timeout
//   // 500 - server error
//   // 502 - bad gateway
//   // 503- service unavailable
//   // 504 - gateway timeout
//   // 522 - connection timeout
//   // 524 - cloudfare specific timeout

//   return new Promise((resolve, reject) => {

//   })
//   return fetch(url, options)
//     .then(res => {
//       if (res.ok) {
//         console.log({
//           res
//         })
//         return res.body
//       }

//       if (retries > 0 && retryCodes.includes(res.status)) {
//         console.log('retrying')
//         setTimeout(() => {
//           /* 2 */
//           return fetchRetry(url, options, retries - 1, backoff * 2) /* 3 */
//         }, backoff) /* 2 */
//       } else {
//         throw new ApiError(res.status, res.statusText)
//       }
//     })
// }


const fetch_retry = async (options, retries = 2, backoff = 300) => {

  const retryCodes = [408, 500, 502, 503, 504, 522, 524]
  // 408 - timeout
  // 500 - server error
  // 502 - bad gateway
  // 503- service unavailable
  // 504 - gateway timeout
  // 522 - connection timeout
  // 524 - cloudfare specific timeout
  try {
    return await axios(options)
  } catch (err) {
    const {
      response
    } = err
    if (retries > 0 && retryCodes.includes(response.status)) {
      await waitFor(backoff)
      return await fetch_retry(options, retries - 1, backoff * 2)
    } else {
      throw new ApiError(response.status, response.statusText)
    }
  }
};

const waitFor = delay => new Promise(resolve => setTimeout(resolve, delay));
module.exports = fetch_retry
