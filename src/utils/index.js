/* eslint-disable no-param-reassign */
/* eslint-disable operator-assignment */
/* eslint-disable no-bitwise */
function padStart(target, targetLength, padString) {
  // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  targetLength = targetLength >> 0; // truncate if number or convert non-number to 0;
  padString = String((typeof padString !== 'undefined' ? padString : ' '));
  if (target.length > targetLength) {
    return String(target);
  }
  targetLength = targetLength - target.length;
  if (targetLength > padString.length) {
    // append to original to ensure we are longer than needed
    padString += padString.repeat(targetLength / padString.length);
  }
  return padString.slice(0, targetLength) + String(target);
}

const getRelativePosition = (el, x, y) => {
  const rect = el.getBoundingClientRect();
  const width = el.width || el.clientWidth;
  const height = el.height || el.clientHeight;
  return {
    x: (x - rect.left) * (width / rect.width),
    y: (y - rect.top) * (height / rect.height),
  };
};

const timeSecondsFormat = (time = 0) => {
  if (isNaN(time)) {
    time = 0;
  }
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${padStart(minutes.toString(), 2, '0')}:${padStart(seconds.toString(), 2, '0')}`;
};

export {
  getRelativePosition,
  timeSecondsFormat,
};
