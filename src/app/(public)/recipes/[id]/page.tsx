'use client';

import Loader from '@/components/common/loader';
import { useRecipeStore } from '@/store/recipe';
import { getUnitLabel } from '@/utils/ingredient';
import { useParams } from 'next/navigation';
import RecipeImage from '@/components/common/recipe-image';
import RecipeControlButtons from '@/components/ui/buttons/RecipeControlButtons';
import { useAuthStore } from '@/store/auth';
import { useUserStore } from '@/store/user';

const RecipePage = () => {
    const { id } = useParams<{ id: string }>();
    const { recipes, isLoading, error } = useRecipeStore();
    const { isAuth } = useAuthStore();
    const { user } = useUserStore();

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
        <div className="container mx-auto p-4 space-y-4 min-w-[400px] max-w-[1024px]">
            <h1 className="text-3xl font-bold mb-4">
                {recipe.name}
            </h1>
            <RecipeImage imgUrl={recipe.imageUrl} />

            <p>{recipe.description}</p>
            <h3 className="mt-4 font-semibold text-xl">
                Ингредиенты:
            </h3>
            <ul className="w-full">
                {recipe.ingredients.map((ingredient) => (
                    <li
                        key={ingredient.id}
                        className="w-full space-x-4 flex"
                    >
                        <span>
                            {ingredient.ingredient.name}
                        </span>
                        <span className="grow border-b-1 "></span>
                        <span>
                            {ingredient.quantity}
                            <span> </span>
                            {getUnitLabel(
                                ingredient.ingredient.unit,
                            )}
                        </span>
                    </li>
                ))}
            </ul>
            <h3 className="mt-4 font-semibold text-xl">
                Порядок приготовления:
            </h3>
            <ol className="w-full">
                {recipe.steps.map((step, index) => (
                    <li key={index}>
                        {index + 1}. {step}
                    </li>
                ))}
            </ol>
            {isAuth && user?.id === recipe.userId && (
                <RecipeControlButtons recipe={recipe} />
            )}
        </div>
    );
};

export default RecipePage;
