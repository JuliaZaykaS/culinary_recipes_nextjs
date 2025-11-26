'use client';
import type { ReactNode } from 'react';

interface IRecipeLayoutProps {
    children: ReactNode;
}

const RecipeLayout = (props: IRecipeLayoutProps) => {
    const { children } = props;

    return <section>{children}</section>;
};

export default RecipeLayout;
