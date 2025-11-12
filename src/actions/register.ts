'use server';

import { siteConfig } from '@/config/site.config';
import { IFormData } from '@/types/form-data';
import { saltAndHashPassword } from '@/utils/password';
import prisma from '@/utils/prisma';

export async function registerUser(formData: IFormData) {
    const { email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
        return {
            error: siteConfig.errors.user.noMatchPassword,
        };
    }

    if (password.length < 6) {
        return {
            error: siteConfig.errors.user
                .inappropriateLength,
        };
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return {
                error: siteConfig.errors.user.emailExists,
            };
        }

        const pwHash = await saltAndHashPassword(password);
        const user = await prisma.user.create({
            data: {
                email,
                password: pwHash,
            },
        });
        return user;
    } catch (error) {
        console.error(siteConfig.errors.user.signIn, error);
        return { error: siteConfig.errors.user.signIn };
    }
}
