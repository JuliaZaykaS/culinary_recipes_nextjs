'use client';

import CustomModal from '@/components/common/modal';
import RegistrationForm from '@/forms/registration';

interface IRegistrationModal {
    isOpen: boolean;
    onClose: () => void;
}
const RegistrationModal = (props: IRegistrationModal) => {
    const { isOpen, onClose } = props;
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={'Создать аккаунт'}
        >
            <RegistrationForm onClose={onClose} />
        </CustomModal>
    );
};

export default RegistrationModal;
