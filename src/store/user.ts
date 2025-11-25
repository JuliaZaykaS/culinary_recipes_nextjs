import { getUser } from '@/actions/user';
import { siteConfig } from '@/config/site.config';
import { IUser } from '@/types/user';
import { create } from 'zustand';

interface IUserState {
    user: IUser | null;
    isLoading: boolean;
    error: string | null;
    setUser: (email: string) => Promise<void>;
}

export const useUserStore = create<IUserState>((set) => ({
    user: null,
    isLoading: false,
    error: null,
    setUser: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
            const result = await getUser(email);
            if (result.success) {
                set({
                    user: result.user,
                    isLoading: false,
                });
            } else {
                set({
                    isLoading: false,
                    error: result.error,
                });
            }
        } catch (error) {
            console.error(
                siteConfig.errors.user.noUser,
                error,
            );
            set({
                isLoading: false,
                error: siteConfig.errors.user.noUser,
            });
        }
    },
}));
