'use client';

import { Spinner } from '@heroui/react';

const Loader = () => {
    return (
        <Spinner
            classNames={{ label: 'text-foreground mt-4' }}
            variant="wave"
            size="lg"
            color="primary"
        />
    );
};

export default Loader;
