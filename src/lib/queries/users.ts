import prisma from '@/lib/config/prisma'

interface UserFilter {
    email?: string;
    active?: boolean;
    age?: number;
}

export const getUsers = async (filter: UserFilter) => {
    return await prisma.user.findMany({
        where: {
            AND: [
                // filter.email ? { email: { contains: filter.email } } : {},
                
            ]
        }
    });
};