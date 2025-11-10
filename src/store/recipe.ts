import {
    createRecipe,
    deleteRecipe,
    getRecipes,
    updateRecipe,
} from '@/actions/recipe';
import { IRecipe } from '@/types/recipe';
import { create } from 'zustand';

interface IActionResult {
    success: boolean;
    recipe?: IRecipe;
    error?: string;
}

interface IRecipeState {
    recipes: IRecipe[];
    isLoading: boolean;
    error: string | null;
    loadRecipes: () => Promise<void>;
    addRecipe: (
        formData: FormData,
    ) => Promise<IActionResult>;
    updateRecipe: (
        id: string,
        formData: FormData,
    ) => Promise<IActionResult>;
    removeRecipe: (id: string) => Promise<void>;
}

export const useRecipeStore = create<IRecipeState>(
    (set) => ({
        recipes: [],
        isLoading: false,
        error: null,
        loadRecipes: async () => {
            set({ isLoading: true, error: null });
            try {
                const result = await getRecipes();
                if (result.success) {
                    set({
                        isLoading: false,
                        recipes: result.recipes,
                    });
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                }
            } catch (error) {
                console.error('error', error);
                set({
                    isLoading: false,
                    error: 'Ошибка при загрузке рецептов',
                });
            }
        },
        addRecipe: async (formData: FormData) => {
            set({ isLoading: true, error: null });
            try {
                const result = await createRecipe(formData);
                if (result.success) {
                    set((state) => ({
                        recipes: [
                            ...state.recipes,
                            result.recipe!,
                        ],
                        isLoading: false,
                    }));
                    return {
                        success: true,
                        recipe: result.recipe,
                    };
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                    return {
                        success: true,
                        error: result.error,
                    };
                }
            } catch (error) {
                console.error('error', error);
                set({
                    isLoading: false,
                    error: 'Ошибка при добавлении рецепта',
                });
                return {
                    success: false,
                    error: 'Ошибка при добавлении рецепта',
                };
            }
        },
        updateRecipe: async (
            id: string,
            formData: FormData,
        ) => {
            try {
                set({ isLoading: true, error: null });
                const result = await updateRecipe(
                    id,
                    formData,
                );
                if (result.success) {
                    set((state) => ({
                        isLoading: false,
                        recipes: state.recipes.map(
                            (recipe) =>
                                recipe.id === id
                                    ? result.recipe!
                                    : recipe,
                        ),
                    }));
                    return {
                        success: true,
                        recipe: result.recipe,
                    };
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                    return {
                        success: false,
                        error: result.error,
                    };
                }
            } catch (error) {
                console.error('error', error);
                set({
                    isLoading: false,
                    error: 'Ошибка при обновлении рецепта',
                });
                return {
                    success: false,
                    error: 'Ошибка при обновлении рецепта',
                };
            }
        },
        removeRecipe: async (id: string) => {
            set({ isLoading: true, error: null });
            try {
                const result = await deleteRecipe(id);
                if (result.success) {
                    set((state) => ({
                        isLoading: false,
                        recipes: state.recipes.filter(
                            (recipe) => recipe.id !== id,
                        ),
                    }));
                } else {
                    set({
                        isLoading: false,
                        error: result.error,
                    });
                }
            } catch (error) {
                console.error('error', error);
                set({
                    isLoading: false,
                    error: 'Ошибка при удалении рецепта',
                });
            }
        },
    }),
);
