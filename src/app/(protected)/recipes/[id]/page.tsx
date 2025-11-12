'use client';

import Loader from '@/components/common/loader';
import RecipeForm from '@/forms/recipe';
import { useRecipeStore } from '@/store/recipe';
import { useParams } from 'next/navigation';

const EditRecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const { recipes, isLoading, error } = useRecipeStore();

    const recipe = recipes.find((r) => r.id === id);

    if (isLoading || recipes.length === 0) {
        return <Loader />;
    }

    if (error) {
        return (
            <p className="text-red-500 text-center">
                {error}
            </p>
        );
    }

    if (!recipe) {
        return (
            <p className="text-red-500 text-center">
                Рецепт не найден
            </p>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
                Редактировать рецепт: {recipe.name}
            </h1>
            <RecipeForm initialRecipe={recipe} />
        </div>
    );
};

export default EditRecipePage;
