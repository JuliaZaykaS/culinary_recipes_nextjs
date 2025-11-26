'use client';
import { useAuthStore } from '@/store/auth';
import { useIngredientStore } from '@/store/ingredient';
import { useRecipeStore } from '@/store/recipe';
import { useUserStore } from '@/store/user';
import { useSession } from 'next-auth/react';
import { ReactNode, useEffect } from 'react';

interface IAppLoaderProps {
    children: ReactNode;
}
const AppLoader = (props: IAppLoaderProps) => {
    const { children } = props;
    const { data: session, status } = useSession();

    const { loadIngredients } = useIngredientStore();
    const { loadRecipes } = useRecipeStore();
    const { setUser } = useUserStore();

    const { isAuth, setAuthState } = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [session, setAuthState, status]);

    useEffect(() => {
        if (isAuth) {
            loadIngredients();
            if (session?.user?.email) {
                setUser(session.user.email);
            }
        }
    }, [isAuth, loadIngredients, session, setUser]);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    return <>{children}</>;
};

export default AppLoader;
