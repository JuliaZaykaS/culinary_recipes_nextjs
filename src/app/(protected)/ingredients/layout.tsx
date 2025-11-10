'use client';
import type { ReactNode } from 'react';

interface IIngredientsLayoutProps {
    children: ReactNode;
}

const IngredientsLayout = (
    props: IIngredientsLayoutProps,
) => {
    const { children } = props;

    return <section>{children}</section>;
};

export default IngredientsLayout;
