
export default function loadSeenNotificationsHistory() {
  let seenNotificationsHistory = localStorage.getItem('seen_notifications');
  if (!seenNotificationsHistory) {
    seenNotificationsHistory = [];
  } else {
    seenNotificationsHistory = JSON.parse(seenNotificationsHistory);
  }
  return seenNotificationsHistory;
}
