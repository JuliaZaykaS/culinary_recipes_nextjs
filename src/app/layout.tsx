import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Providers } from '../providers/provider';
import { siteConfig } from '../config/site.config';
import { layoutConfig } from '../config/layout.config';
import Header from '@/components/ui/layout/header';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth/auth';
import AppLoader from '@/hoc/app-loader';
import PageTitle from '@/components/ui/layout/page-title';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

// для seo
export const metadata: Metadata = {
    title: siteConfig.title,
    description: siteConfig.description,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await auth();
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <Providers>
                    <SessionProvider session={session}>
                        <AppLoader>
                            <div className="flex min-h-screen flex-col justify-between">
                                <div className="flex flex-col">
                                    <Header />
                                    <main
                                        className={`flex flex-col max-w-[1024px] mx-auto px-[24px] justify-start items-center`}
                                    >
                                        <PageTitle />
                                        {children}
                                    </main>
                                </div>
                                <footer
                                    className={`flex justify-center items-center`}
                                    style={{
                                        height: `${layoutConfig.footerHeight}`,
                                    }}
                                >
                                    <p>
                                        {
                                            siteConfig.description
                                        }
                                    </p>
                                </footer>
                            </div>
                        </AppLoader>
                    </SessionProvider>
                </Providers>
            </body>
        </html>
    );
}
