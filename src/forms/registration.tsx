'use client';
import { registerUser } from '@/actions/register';
import { siteConfig } from '@/config/site.config';
import { IFormData } from '@/types/form-data';
import {
    getDangerToast,
    getSuccessToast,
} from '@/utils/toasts';

import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
import { FormEvent, useState } from 'react';

interface IRegistrationFormProps {
    onClose: () => void;
}
const RegistrationForm = (
    props: IRegistrationFormProps,
) => {
    const { onClose } = props;

    const [formData, setFormData] = useState<IFormData>({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const result = await registerUser(formData);

        if (result.hasOwnProperty('error')) {
            getDangerToast(siteConfig.errors.user.signIn);
        } else {
            getSuccessToast(
                siteConfig.alerts.user.signInSuccess,
            );
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
                    if (!validateEmail(value))
                        return 'Некорректный email';
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
                    if (value.length < 6) {
                        return 'Пароль должен быть не менее 6 символов';
                    }
                    return null;
                }}
            />
            <Input
                isRequired
                name="confirmPassword"
                placeholder="Подтвердите пароль"
                type="password"
                value={formData.confirmPassword}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                    })
                }
                validate={(value) => {
                    if (!value)
                        return 'Пароль для подтверждения обязателен';
                    if (value !== formData.password) {
                        return 'Пароли не совпадают';
                    }
                    return null;
                }}
            />

            <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
                <Button variant="light" onPress={onClose}>
                    Отмена
                </Button>
                <Button color="primary" type="submit">
                    Зарегистрироваться
                </Button>
            </div>
        </Form>
    );
};

export default RegistrationForm;
