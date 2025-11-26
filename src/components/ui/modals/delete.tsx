'use client';

import CustomModal from '@/components/common/modal';
import { Button } from '@heroui/react';

interface IDeleteProps {
    isOpen: boolean;
    onClose: () => void;
    text: string;
    onClick: () => void;
}

const DeleteModal = (props: IDeleteProps) => {
    const { isOpen, onClose, text, onClick } = props;

    const footer = (
        <>
            <Button
                color="default"
                variant="light"
                onPress={onClose}
            >
                Закрыть
            </Button>
            <Button color="danger" onPress={onClick}>
                Удалить
            </Button>
        </>
    );

    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={'Внимание'}
            footer={footer}
        >
            <p className="text-l font-semibold text-red-600">
                {text}
            </p>
        </CustomModal>
    );
};

export default DeleteModal;
