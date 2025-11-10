'use client';
import DOMPurify from 'isomorphic-dompurify';
import parse from 'html-react-parser';

import { siteConfig } from '@/config/site.config';
import { usePathname } from 'next/navigation';

const PageContent = () => {
    const pathname = usePathname();
    const pageContent =
        siteConfig.pagesContent[
            pathname as keyof typeof siteConfig.pagesContent
        ];

    if (!pageContent) {
        return <div>Страница не найдена</div>;
    }

    const cleanHTML = DOMPurify.sanitize(
        pageContent.content,
    );
    // return <p>{pageContent.content}</p>;
    // для вставки хтмл разметки напрямую в дом, минуя экранирование
    // return (
    //     <div
    //         dangerouslySetInnerHTML={{
    //             __html: pageContent.content,
    //         }}
    //     />
    // );
    return <div>{parse(cleanHTML)}</div>;
};

export default PageContent;
