'use server';

import { siteConfig } from '@/config/site.config';
import prisma from '@/utils/prisma';

export async function getUser(email: string) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        return { success: true, user };
    } catch (error) {
        console.error(siteConfig.errors.user.noUser, error);
        return {
            success: false,
            error: siteConfig.errors.user.noUser,
        };
    }
}
