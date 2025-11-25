'use client';

import Image from 'next/image';

interface IRecipeImageProps {
    imgUrl: string | null | undefined;
}

const RecipeImage = (props: IRecipeImageProps) => {
    const { imgUrl } = props;
    return (
        <div className="h-48 overflow-hidden">
            {imgUrl ? (
                <div className="relative h-48 group overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md transition-all hover:shadow-lg">
                    <Image
                        src={imgUrl}
                        alt="Image for recipe"
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
            ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">
                        Нет изображения
                    </span>
                </div>
            )}
        </div>
    );
};

export default RecipeImage;
