'use server';

import { siteConfig } from '@/config/site.config';
import { ingredientsSchema } from '@/schema/zod';
import prisma from '@/utils/prisma';
import { ZodError } from 'zod';

export async function createIngredient(formData: FormData) {
    try {
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            unit: formData.get('unit') as string,
            pricePerUnit: formData.get('pricePerUnit')
                ? parseFloat(
                      formData.get(
                          'pricePerUnit',
                      ) as string,
                  )
                : null,
            description: formData.get(
                'description',
            ) as string,
        };

        const validatedData = ingredientsSchema.parse(data);

        const ingredient = await prisma.ingredient.create({
            data: {
                name: validatedData.name,
                category: validatedData.category,
                unit: validatedData.unit,
                pricePerUnit: validatedData.pricePerUnit,
                description: validatedData.description,
            },
        });
        return { success: true, ingredient };
    } catch (error) {
        if (error instanceof ZodError) {
            return {
                error: error.issues
                    .map((e) => e.message)
                    .join(', '),
            };
        }
        console.error(
            siteConfig.errors.ingredient.create,
            error,
        );
        return {
            error: siteConfig.errors.ingredient.create,
        };
    }
}

export async function getIngredients() {
    try {
        const ingredients =
            await prisma.ingredient.findMany({
                include: {
                    recipes: {
                        select: { id: true },
                    },
                },
            });
        const updIngredients = ingredients.map((i) => ({
            ...i,
            isUsed: i.recipes.length > 0,
        }));

        return {
            success: true,
            ingredients: updIngredients,
        };
    } catch (error) {
        console.error(
            siteConfig.errors.ingredient.loading,
            error,
        );
        return {
            error: siteConfig.errors.ingredient.loading,
        };
    }
}

export async function deleteIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: { id: id },
        });

        return { success: true, ingredient };
    } catch (error) {
        console.error(
            siteConfig.errors.ingredient.delete,
            error,
        );
        return {
            error: siteConfig.errors.ingredient.delete,
        };
    }
}
