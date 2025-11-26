'use client';

import {
    CATEGORY_OPTIONS,
    UNIT_OPTIONS,
} from '@/constants/select-options';
import { useAuthStore } from '@/store/auth';
import { useIngredientStore } from '@/store/ingredient';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import Loader from '@/components/common/loader';
import DeleteModal from '../modals/delete';
import { useState } from 'react';
import {
    getDangerToast,
    getSuccessToast,
} from '@/utils/toasts';

function IngredientsTable() {
    const { ingredients, removeIngredient, isLoading } =
        useIngredientStore();

    const { isAuth } = useAuthStore();

    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = async (id: string) => {
        const result = await removeIngredient(id);
        if (result.success) {
            getSuccessToast('Ингредиент удален успешно');
        } else {
            getDangerToast(
                'Ошибка при удалении ингредиента',
            );
        }
    };

    const getCategoryLabel = (value: string) => {
        const option = CATEGORY_OPTIONS.find(
            (opt) => opt.value === value,
        );
        return option ? option.label : value;
    };
    const getUnitLabel = (value: string) => {
        const option = UNIT_OPTIONS.find(
            (opt) => opt.value === value,
        );
        return option ? option.label : value;
    };

    if (!isAuth) {
        return <p>Не авторизован</p>;
    }

    return !isLoading && isAuth ? (
        <Table
            aria-label="Список ингредиентов"
            classNames={{
                wrapper: 'mt-4',
                table: 'w-full',
                th: 'text-black',
                td: 'text-black',
            }}
        >
            <TableHeader>
                <TableColumn>Название</TableColumn>
                <TableColumn>Категория</TableColumn>
                <TableColumn>Ед. изм.</TableColumn>
                <TableColumn>Цена за единицу</TableColumn>
                <TableColumn>Описание</TableColumn>
                <TableColumn>Действия</TableColumn>
            </TableHeader>
            <TableBody>
                {ingredients.map((ingredient) => {
                    return (
                        <TableRow key={ingredient.id}>
                            <TableCell>
                                {ingredient.name}
                            </TableCell>
                            <TableCell>
                                {getCategoryLabel(
                                    ingredient.category,
                                )}
                            </TableCell>
                            <TableCell>
                                {getUnitLabel(
                                    ingredient.unit,
                                )}
                            </TableCell>
                            <TableCell>
                                {ingredient.pricePerUnit !==
                                null
                                    ? `${ingredient.pricePerUnit} ₽`
                                    : '-'}
                            </TableCell>
                            <TableCell>
                                {ingredient.description ||
                                    '-'}
                            </TableCell>
                            <TableCell>
                                <Button
                                    color="danger"
                                    size="sm"
                                    isDisabled={
                                        ingredient.isUsed
                                    }
                                    onPress={() =>
                                        setIsOpen(true)
                                    }
                                >
                                    Удалить
                                </Button>
                                <DeleteModal
                                    isOpen={isOpen}
                                    onClose={() =>
                                        setIsOpen(false)
                                    }
                                    onClick={() => {
                                        handleDelete(
                                            ingredient.id,
                                        );
                                        setIsOpen(false);
                                    }}
                                    text={
                                        'Вы действительно хотите удалить ингредиент?'
                                    }
                                ></DeleteModal>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    ) : (
        <Loader className="mt-4" />
    );
}

export default IngredientsTable;
