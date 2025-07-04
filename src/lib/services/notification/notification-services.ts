import { getRecentNotificationsByUserIdQuery } from "@/lib/data-layers/notifications";

export async function getRecentNotificationsByUserIdService(uid: string) {
  try {
    const userId = Number(uid);
    if (isNaN(userId)) throw new Error("Invalid user id queried.");
    const notifications = await getRecentNotificationsByUserIdQuery(userId);
    if (!notifications)
      throw new Error(
        "Failed to query user's notifications from the database."
      );
    const formattedNotifications = notifications.map((notification) => ({
      ...notification,
      createdAt: notification.createdAt.toISOString(),
    }));
    // console.log(formattedNotifications);
    return formattedNotifications;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
    console.error(error);
    throw new Error("Internal Server Error");
  }
}
