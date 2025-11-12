'use server';

import { signIn } from '@/auth/auth';
import { siteConfig } from '@/config/site.config';

export async function signInWithCredentials(
    email: string,
    password: string,
) {
    try {
        const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
        });

        return result;
    } catch (error) {
        console.error(siteConfig.errors.user.auth, error);
        return siteConfig.errors.user.auth;
    }
}
