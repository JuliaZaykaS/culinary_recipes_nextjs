'use client';
import { signInWithCredentials } from '@/actions/sign-in';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { Button } from '@heroui/react';
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

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        await signInWithCredentials(
            formData.email,
            formData.password,
        );
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
