'use client';

import { signInWithCredentials } from '@/actions/sign-in';
import { siteConfig } from '@/config/site.config';
import { getDangerToast } from '@/utils/toasts';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { useSession } from 'next-auth/react';
import { FormEvent, useState } from 'react';

interface ILoginFormProps {
    onClose: () => void;
}
const LoginForm = (props: ILoginFormProps) => {
    const { onClose } = props;

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const { update } = useSession();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await signInWithCredentials(
            formData.email,
            formData.password,
        );

        if (result === siteConfig.errors.user.auth) {
            getDangerToast(result);
        } else {
            await update(); // это вызовет рефетч сессии
        }
        onClose();
    };

    return (
        <Form
            className="w-full max-w-xs flex flex-col gap-4"
            onSubmit={handleSubmit}
        >
            <Input
                aria-label="Email"
                isRequired
                name="email"
                placeholder="Введите email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        email: e.target.value,
                    })
                }
                validate={(value) => {
                    if (!value) return 'Почта обязательна';
                    return null;
                }}
            />

            <Input
                isRequired
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        password: e.target.value,
                    })
                }
                validate={(value) => {
                    if (!value) return 'Пароль обязателен';
                    return null;
                }}
            />

            <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button color="primary" type="submit">
                    Войти
                </Button>
            </div>
        </Form>
    );
};

export default LoginForm;
