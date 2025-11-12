import {
    createIngredient,
    deleteIngredient,
    getIngredients,
} from '@/actions/ingredient';
import { siteConfig } from '@/config/site.config';
import { IIngredient } from '@/types/ingredient';
import { create } from 'zustand';

interface IIngredientState {
    ingredients: IIngredient[];
    isLoading: boolean;
    error: string | null;
    loadIngredients: () => Promise<void>;
    addIngredient: (formData: FormData) => Promise<void>;
    removeIngredient: (id: string) => Promise<void>;
}

export const useIngredientStore = create<IIngredientState>(
    (set) => ({
        ingredients: [],
        isLoading: false,
        error: null,
        loadIngredients: async () => {
            set({ isLoading: true, error: null });
            try {
                const result = await getIngredients();
                if (result.success) {
                    set({
                        isLoading: false,
                        ingredients: result.ingredients,
                    });
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                }
            } catch (error) {
                console.error(
                    siteConfig.errors.ingredient.loading,
                    error,
                );

                set({
                    isLoading: false,
                    error: siteConfig.errors.ingredient
                        .loading,
                });
            }
        },
        addIngredient: async (formData: FormData) => {
            set({ isLoading: true, error: null });

            try {
                const result = await createIngredient(
                    formData,
                );
                if (result.success) {
                    set((state) => ({
                        isLoading: false,
                        ingredients: [
                            ...state.ingredients,
                            result.ingredient,
                        ],
                    }));
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                }
            } catch (error) {
                console.error(
                    siteConfig.errors.ingredient.create,
                    error,
                );

                set({
                    isLoading: false,
                    error: siteConfig.errors.ingredient
                        .create,
                });
            }
        },
        removeIngredient: async (id: string) => {
            set({ isLoading: true, error: null });
            try {
                const result = await deleteIngredient(id);
                if (result.success) {
                    set((state) => ({
                        isLoading: false,
                        ingredients:
                            state.ingredients.filter(
                                (ingredient) =>
                                    ingredient.id !== id,
                            ),
                    }));
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                }
            } catch (error) {
                console.error(
                    siteConfig.errors.ingredient.delete,
                    error,
                );

                set({
                    isLoading: false,
                    error: siteConfig.errors.ingredient
                        .delete,
                });
            }
        },
    }),
);
