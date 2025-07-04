import prisma from "../config/prisma";

export const getRecentNotificationsByUserIdQuery = async (userId: number) => {
  const notifications = await prisma.notification.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  });

  return notifications;
};
