import { Prisma } from '@/database/prisma-client';
import prisma from '@/lib/config/prisma'

export const queryUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            image: true,
            icRatio: true,
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

export const getUserByIdQuery = async (uid : number) => {
    const user = await prisma.user.findFirst({ 
        where: { id: uid },
        select: {
            icRatio: true,
            eatCountdown: true,
            targetBG: true,
            correctionFactor: true
        }
    })
    return user
}

export const updateUserQuery = async (uid : number, record : Prisma.UserUpdateInput) => {
    return await prisma.user.update({
        where: { id: uid },
        data: { ...record }
    })
}