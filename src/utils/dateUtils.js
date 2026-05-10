// Converts UTC timestamp to IST (UTC+5:30)
function toIST(utcStr) {
  const utc = new Date(utcStr);
  return new Date(utc.getTime() + 5.5 * 60 * 60 * 1000);
}

export function formatDate(utcStr) {
  return toIST(utcStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatTime(utcStr) {
  return toIST(utcStr).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatDateTime(utcStr) {
  return `${formatDate(utcStr)} · ${formatTime(utcStr)}`;
}
