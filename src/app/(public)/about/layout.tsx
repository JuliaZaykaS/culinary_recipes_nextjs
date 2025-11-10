'use client';

import type { ReactNode } from 'react';

interface IAboutLayoutProps {
    children: ReactNode;
}

const AboutLayout = (props: IAboutLayoutProps) => {
    const { children } = props;

    return <section>{children}</section>;
};

export default AboutLayout;
