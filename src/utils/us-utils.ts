const isSafari = window
  ? /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
  : false;

export { isSafari };
