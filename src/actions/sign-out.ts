'use server';

import { signOut } from '@/auth/auth';
import { siteConfig } from '@/config/site.config';

export async function signOutFunc() {
    try {
        const result = await signOut({ redirect: false });
        return result;
    } catch (error) {
        console.error(siteConfig.errors.user.auth, error);
        throw error;
    }
}
