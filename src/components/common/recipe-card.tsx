'use client';

import type { IRecipe } from '@/types/recipe';
import {
    Card,
    CardBody,
    CardHeader,
    ScrollShadow,
    CardFooter,
} from '@heroui/react';

import Link from 'next/link';
import { useAuthStore } from '@/store/auth';
import { getUnitLabel } from '@/utils/ingredient';
import RecipeImage from './recipe-image';
import RecipeControlButtons from '../ui/buttons/RecipeControlButtons';
import { useUserStore } from '@/store/user';

interface IRecipeCardProps {
    recipe: IRecipe;
}

const RecipeCard = (props: IRecipeCardProps) => {
    const { recipe } = props;

    const { isAuth } = useAuthStore();
    const { user } = useUserStore();

    return (
        <Card className="w-full min-w-[254px] max-w-md h-[480px] flex flex-col">
            <Link href={`/recipes/${recipe.id}`}>
                <RecipeImage imgUrl={recipe.imageUrl} />

                <CardHeader className="flex justify-between items-center text-black">
                    <h2 className="text-xl font-bold">
                        {recipe.name}
                    </h2>
                </CardHeader>

                <CardBody className="flex-1 text-black">
                    <p className="text-gray-600 line-clamp-6 overflow-hidden text-ellipsis whitespace-nowrap min-h-[25px] max-h-[30px]">
                        {recipe.description ||
                            'Без описания'}
                    </p>
                    <h3 className="mt-4 font-semibold">
                        Ингредиенты:
                    </h3>
                    <ScrollShadow
                        className="max-h-24"
                        hideScrollBar
                    >
                        <ul className="list-disc pl-5">
                            {recipe.ingredients.map(
                                (ing) => (
                                    <li
                                        key={ing.id}
                                        className="space-x-2"
                                    >
                                        <span>
                                            {
                                                ing
                                                    .ingredient
                                                    .name
                                            }
                                            :
                                        </span>

                                        <span>
                                            {ing.quantity}
                                        </span>
                                        <span>
                                            {getUnitLabel(
                                                ing
                                                    .ingredient
                                                    .unit,
                                            )}
                                        </span>
                                    </li>
                                ),
                            )}
                        </ul>
                    </ScrollShadow>
                </CardBody>
            </Link>
            {isAuth && user?.id === recipe.userId && (
                <CardFooter className="mt-auto p-0 pb-3 pl-3 pr-3">
                    <RecipeControlButtons recipe={recipe} />
                </CardFooter>
            )}
        </Card>
    );
};

export default RecipeCard;
