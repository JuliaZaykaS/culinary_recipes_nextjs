'use client';

import { siteConfig } from '@/config/site.config';
import { useRecipeStore } from '@/store/recipe';
import { IRecipe } from '@/types/recipe';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useState, useTransition } from 'react';
import DeleteModal from '../modals/delete';
import {
    getDangerToast,
    getSuccessToast,
} from '@/utils/toasts';

interface IRecipeControlButtonsProps {
    recipe: IRecipe;
}

const RecipeControlButtons = (
    props: IRecipeControlButtonsProps,
) => {
    const { recipe } = props;

    const { removeRecipe } = useRecipeStore();

    const [isPending, startTransition] = useTransition();
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        startTransition(async () => {
            try {
                const result = await removeRecipe(
                    recipe.id,
                );

                if (result.success) {
                    getSuccessToast(
                        siteConfig.alerts.recipe
                            .deleteSuccess,
                    );
                } else {
                    getDangerToast(
                        siteConfig.errors.recipe.delete,
                    );
                }
            } catch (error) {
                console.error(
                    siteConfig.errors.recipe.delete,
                    error,
                );
                getDangerToast(
                    siteConfig.errors.recipe.delete,
                );
            }
        });
    };

    return (
        <>
            <div className="flex justify-end gap-2 ml-auto">
                <Link href={`/recipes/edit/${recipe.id}`}>
                    <Button color="primary" variant="light">
                        Редактировать
                    </Button>
                </Link>
                <Button
                    color="danger"
                    variant="light"
                    onPress={() => setIsOpen(true)}
                    isLoading={isPending}
                >
                    Удалить
                </Button>
            </div>
            <DeleteModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onClick={() => {
                    handleDelete();
                    setIsOpen(false);
                }}
                text={
                    'Вы действительно хотите удалить рецепт?'
                }
            ></DeleteModal>
        </>
    );
};

export default RecipeControlButtons;
