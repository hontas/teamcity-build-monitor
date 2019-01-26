const isSupported = typeof window !== 'undefined' && 'Intl' in window && Intl.RelativeTimeFormat;
const rtf = isSupported && new Intl.RelativeTimeFormat('en');

const oneMinute = 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export function toRelative(date) {
  if (!isSupported) return date;

  let diff = (Date.now() - new Date(date)) / 1000; // get diff in seconds
  if (diff < oneMinute) return rtf.format(Math.round(-diff), 'second');
  if (diff < oneHour) return rtf.format(Math.round(-diff / oneMinute), 'minute');
  if (diff < oneDay) return rtf.format(Math.round(-diff / oneHour), 'minute');
  return rtf.format(Math.round(-diff / oneDay), 'day');
}

export function toMinSec(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsInMinute = seconds % 60;
  return `${minutes}:${secondsInMinute}`;
}
