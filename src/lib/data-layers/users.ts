import { Prisma } from '@/database/prisma-client';
import prisma from '@/lib/config/prisma'

export const queryUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            ic_ratio: true,
            createdAt: true,
        },
    });

    return users;
};


export const queryUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
}

export const queryCreateUser = async (user : Prisma.UserCreateInput) => {
    return await prisma.user.create({
        data: user
    })
}