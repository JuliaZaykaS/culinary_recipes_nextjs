'use client';

import { Spinner } from '@heroui/react';

interface ILoaderProps {
    className?: string;
}
const Loader = (props: ILoaderProps) => {
    const { className } = props;
    return (
        <Spinner
            classNames={{
                label: 'text-foreground mt-4',
                wrapper: className,
            }}
            variant="wave"
            size="lg"
            color="primary"
        />
    );
};

export default Loader;
