'use client';
import { useAuthStore } from '@/store/auth';
import { useIngredientStore } from '@/store/ingredient';
import { useRecipeStore } from '@/store/recipe';
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

    const { isAuth, setAuthState } = useAuthStore();

    useEffect(() => {
        setAuthState(status, session);
    }, [session, setAuthState, status]);

    useEffect(() => {
        if (isAuth) {
            loadIngredients();
        }
    }, [isAuth, loadIngredients]);

    useEffect(() => {
        loadRecipes();
    }, [loadRecipes]);

    return <>{children}</>;
};

export default AppLoader;
