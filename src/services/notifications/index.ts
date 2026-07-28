export type NotificationPayload = {
  userId: string;
  title: string;
  message: string;
};

export async function sendNotification(payload: NotificationPayload) {
  return {
    delivered: true,
    payload,
  };
}
