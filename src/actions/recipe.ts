'use server';

import { siteConfig } from '@/config/site.config';
import prisma from '@/utils/prisma';
import {
    getIngredientsArrayFromFormData,
    getStepsArrayFromFormData,
} from '@/utils/recipe';

export async function getRecipes() {
    try {
        // запрашиваем все рецепты вместе со связанными таблицами по ингредиентам
        const recipes = await prisma.recipe.findMany({
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { success: true, recipes };
    } catch (error) {
        console.error(
            siteConfig.errors.recipe.loading,
            error,
        );
        return {
            success: false,
            error: siteConfig.errors.recipe.loading,
        };
    }
}

export async function createRecipe(
    formData: FormData,
    userId: string,
) {
    try {
        const name = formData.get('name') as string;
        const description = formData.get(
            'description',
        ) as string;
        const imageUrl = formData.get('imageUrl') as string;

        const ingredients =
            getIngredientsArrayFromFormData(formData);

        const steps = getStepsArrayFromFormData(formData);

        if (
            !name ||
            ingredients.length === 0 ||
            steps.length === 0
        ) {
            return {
                success: false,
                error: siteConfig.errors.recipe
                    .requiredFields,
            };
        }

        const recipe = await prisma.recipe.create({
            data: {
                name: name,
                description: description,
                imageUrl: imageUrl,
                // создаем запись в связанной таблице
                ingredients: {
                    create: ingredients.map(
                        ({ ingredientId, quantity }) => ({
                            ingredient: {
                                connect: {
                                    id: ingredientId,
                                },
                            },
                            quantity,
                        }),
                    ),
                },
                steps: steps.map((step) => step as string),
                userId: userId,
            },
            // необходимо для работы со связанными таблицами
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { success: true, recipe };
    } catch (error) {
        console.error(
            siteConfig.errors.recipe.create,
            error,
        );
        return {
            success: false,
            error: siteConfig.errors.recipe.create,
        };
    }
}

export async function updateRecipe(
    id: string,
    formData: FormData,
) {
    try {
        const name = formData.get('name') as string;
        const description = formData.get(
            'description',
        ) as string;
        const imageUrl = formData.get('imageUrl') as string;

        const ingredients =
            getIngredientsArrayFromFormData(formData);
        const steps = getStepsArrayFromFormData(formData);

        if (
            !name ||
            ingredients.length === 0 ||
            steps.length === 0
        ) {
            return {
                success: false,
                error: siteConfig.errors.recipe
                    .requiredFields,
            };
        }

        const recipe = await prisma.recipe.update({
            where: { id },
            data: {
                name,
                description,
                imageUrl,
                ingredients: {
                    deleteMany: {},
                    create: ingredients.map(
                        ({ ingredientId, quantity }) => ({
                            ingredient: {
                                connect: {
                                    id: ingredientId,
                                },
                            },
                            quantity,
                        }),
                    ),
                },
                steps: steps.map((step) => step as string),
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
            },
        });

        return { success: true, recipe };
    } catch (error) {
        console.error(
            siteConfig.errors.recipe.update,
            error,
        );
        return {
            success: false,
            error: siteConfig.errors.recipe.update,
        };
    }
}

export async function deleteRecipe(id: string) {
    try {
        // удаляем из связанной таблицы ингредиенты, относящиеся к данному рецепту
        await prisma.recipeIngredient.deleteMany({
            where: { recipeId: id },
        });
        // удаляем сам рецепт
        await prisma.recipe.delete({
            where: { id: id },
        });

        return { success: true };
    } catch (error) {
        console.error(
            siteConfig.errors.recipe.delete,
            error,
        );
        return {
            success: false,
            error: siteConfig.errors.recipe.delete,
        };
    }
}
