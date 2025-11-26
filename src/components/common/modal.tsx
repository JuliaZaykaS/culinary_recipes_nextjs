'use client';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
} from '@heroui/modal';
import { ReactNode } from 'react';

interface ICustomModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    footer?: ReactNode;
}

const CustomModal = (props: ICustomModalProps) => {
    const {
        isOpen,
        onClose,
        title,
        children,
        size,
        footer,
    } = props;
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={size}
        >
            <ModalContent>
                <ModalHeader className="border-b">
                    <h3 className="text-xl text-background font-semibold">
                        {title}
                    </h3>
                </ModalHeader>
                <ModalBody className="space-y-4 py-6">
                    {children}
                </ModalBody>
                {footer && (
                    <ModalFooter>{footer}</ModalFooter>
                )}
            </ModalContent>
        </Modal>
    );
};

export default CustomModal;
