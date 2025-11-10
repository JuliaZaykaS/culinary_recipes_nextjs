'use client';

import CustomModal from '@/components/common/modal';
import LoginForm from '@/forms/login';

interface ILoginModal {
    isOpen: boolean;
    onClose: () => void;
}
const LoginModal = (props: ILoginModal) => {
    const { isOpen, onClose } = props;
    return (
        <CustomModal
            isOpen={isOpen}
            onClose={onClose}
            title={'Авторизация'}
        >
            <LoginForm onClose={onClose} />
        </CustomModal>
    );
};

export default LoginModal;
