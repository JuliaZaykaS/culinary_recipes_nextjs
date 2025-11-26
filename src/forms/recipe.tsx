'use client';

import { useState, useTransition } from 'react';
import {
    Button,
    Form,
    Input,
    Select,
    SelectItem,
    Textarea,
    Tooltip,
} from '@heroui/react';

import { IRecipe } from '@/types/recipe';
import { useRouter } from 'next/navigation';
import { useIngredientStore } from '@/store/ingredient';
import { useRecipeStore } from '@/store/recipe';
import { useUserStore } from '@/store/user';
import { siteConfig } from '@/config/site.config';

interface IRecipeFormProps {
    initialRecipe?: IRecipe;
}

interface IIngredientField {
    id: number;
    ingredientId: string;
    quantity: number | null;
}

interface IStepField {
    id: number;
    step: string;
}

const initialState = {
    name: '',
    description: '',
    imageUrl: '',
};

const RecipeForm = (props: IRecipeFormProps) => {
    const { initialRecipe } = props;
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: initialRecipe?.name || initialState.name,
        description:
            initialRecipe?.description ||
            initialState.description,
        imageUrl:
            initialRecipe?.imageUrl ||
            initialState.imageUrl,
    });

    const [ingredientFields, setIngredientFields] =
        useState<IIngredientField[]>(
            initialRecipe?.ingredients
                ? initialRecipe.ingredients.map(
                      (ing, index) => ({
                          id: index,
                          ingredientId: ing.ingredientId,
                          quantity: ing.quantity,
                      }),
                  )
                : [
                      {
                          id: 0,
                          ingredientId: '',
                          quantity: null,
                      },
                  ],
        );
    const [stepsFields, setStepsFields] = useState<
        IStepField[]
    >(
        initialRecipe?.steps
            ? initialRecipe.steps.map((step, idx) => ({
                  id: idx,
                  step: step,
              }))
            : [
                  {
                      id: 0,
                      step: '',
                  },
              ],
    );

    const { ingredients } = useIngredientStore();
    const { addRecipe, updateRecipe } = useRecipeStore();
    const [isPending, startTransition] = useTransition();
    const { user } = useUserStore();

    const router = useRouter();

    const handleAddIngredientField = () => {
        if (ingredientFields.length < 10) {
            setIngredientFields([
                ...ingredientFields,
                {
                    id: ingredientFields.length,
                    ingredientId: '',
                    quantity: null,
                },
            ]);
        }
    };

    const handleRemoveIngredientField = (id: number) => {
        if (ingredientFields.length > 1) {
            setIngredientFields(
                ingredientFields.filter(
                    (field) => field.id !== id,
                ),
            );
        }
    };

    const handleIngredientChange = (
        id: number,
        field: keyof IIngredientField,
        value: string | number | null,
    ) => {
        setIngredientFields(
            ingredientFields.map((f) =>
                f.id === id ? { ...f, [field]: value } : f,
            ),
        );
    };

    const handleAddStepField = () => {
        if (stepsFields.length < 20) {
            setStepsFields([
                ...stepsFields,
                {
                    id: stepsFields.length,
                    step: '',
                },
            ]);
        }
    };

    const handleRemoveStepField = (id: number) => {
        if (stepsFields.length > 1) {
            setStepsFields(
                stepsFields.filter(
                    (field) => field.id !== id,
                ),
            );
        }
    };

    const handleStepChange = (
        id: number,
        value: string,
    ) => {
        setStepsFields(
            stepsFields.map((f) =>
                f.id === id ? { ...f, step: value } : f,
            ),
        );
    };

    const handleSubmit = async (formData: FormData) => {
        startTransition(async () => {
            setError(null);
            if (!user?.id) return;
            const result = initialRecipe
                ? await updateRecipe(
                      initialRecipe.id,
                      formData,
                  )
                : await addRecipe(formData, user?.id);

            if (result.success) {
                setIngredientFields([
                    {
                        id: 0,
                        ingredientId: '',
                        quantity: null,
                    },
                ]);
                router.push('/');
                setFormData(initialState);
            } else {
                setError(
                    result.error ||
                        siteConfig.errors.recipe.save,
                );
            }
        });
    };

    return (
        <Form className="w-[450px]" action={handleSubmit}>
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}

            <Input
                isRequired
                name="name"
                placeholder="Введите название рецепта"
                type="text"
                value={formData.name}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        name: e.target.value,
                    })
                }
                validate={(value) =>
                    !value ? 'Название обязательно' : null
                }
            />

            <Input
                name="description"
                placeholder="Введите описание (необязательно)"
                type="text"
                value={formData.description}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        description: e.target.value,
                    })
                }
            />
            <Input
                name="imageUrl"
                placeholder="URL изображения (необязательно)"
                type="url"
                value={formData.imageUrl}
                classNames={{
                    inputWrapper: 'bg-default-100',
                    input: 'text-sm focus:outline-none',
                }}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        imageUrl: e.target.value,
                    })
                }
            />

            <div className="space-y-2 w-full">
                <h3>Список ингредиентов</h3>
                {ingredientFields.map((field, index) => (
                    <div
                        key={field.id}
                        className="flex gap-2 items-center"
                    >
                        <Select
                            isRequired
                            name={`ingredient_${index}`}
                            placeholder="Выберите ингредиент"
                            selectedKeys={
                                field.ingredientId
                                    ? [field.ingredientId]
                                    : []
                            }
                            classNames={{
                                trigger:
                                    'bg-default-100 w-full',
                                innerWrapper: 'text-sm',
                                value: 'truncate',
                                selectorIcon: 'text-black',
                            }}
                            onChange={(e) =>
                                handleIngredientChange(
                                    field.id,
                                    'ingredientId',
                                    e.target.value,
                                )
                            }
                        >
                            {ingredients.map(
                                (ingredient) => (
                                    <SelectItem
                                        key={ingredient.id}
                                        className="text-black"
                                    >
                                        {ingredient.name}
                                    </SelectItem>
                                ),
                            )}
                        </Select>
                        <Input
                            isRequired
                            name={`quantity_${index}`}
                            placeholder="Количество"
                            type="number"
                            value={
                                field.quantity !== null
                                    ? field.quantity.toString()
                                    : ''
                            }
                            classNames={{
                                inputWrapper:
                                    'bg-default-100 w-full',
                                input: 'text-sm focus:outline-none',
                            }}
                            className="w-[100px]"
                            onChange={(e) =>
                                handleIngredientChange(
                                    field.id,
                                    'quantity',
                                    e.target.value
                                        ? parseFloat(
                                              e.target
                                                  .value,
                                          )
                                        : null,
                                )
                            }
                            validate={(value) =>
                                !value ||
                                parseFloat(value) <= 0
                                    ? 'Количество должно быть больше 0'
                                    : null
                            }
                        />
                        {ingredientFields.length > 1 && (
                            <Tooltip
                                className="capitalize"
                                color={'danger'}
                                content={'Удалить'}
                                placement={'right-end'}
                            >
                                <Button
                                    color="danger"
                                    variant="light"
                                    onPress={() =>
                                        handleRemoveIngredientField(
                                            field.id,
                                        )
                                    }
                                    className="w-[50px]"
                                >
                                    -
                                </Button>
                            </Tooltip>
                        )}
                    </div>
                ))}

                {ingredientFields.length < 10 && (
                    <Tooltip
                        className="capitalize"
                        color={'primary'}
                        content={'Добавить'}
                        placement={'left-start'}
                    >
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={
                                handleAddIngredientField
                            }
                        >
                            +
                        </Button>
                    </Tooltip>
                )}
            </div>
            <div className="space-y-2 w-full">
                <h3>Инструкция приготовления</h3>
                <ol className="w-full space-y-2">
                    {stepsFields.map((step, index) => (
                        <li
                            key={index}
                            className="flex gap-2 items-center"
                        >
                            <Textarea
                                isRequired
                                minRows={2}
                                name={`step_${index}`}
                                placeholder={`Шаг ${
                                    index + 1
                                }`}
                                type="text"
                                value={step.step}
                                classNames={{
                                    inputWrapper:
                                        'bg-default-100 w-full h-auto',
                                    input: 'text-sm focus:outline-none',
                                }}
                                className="w-full"
                                onChange={(e) =>
                                    handleStepChange(
                                        step.id,
                                        e.target.value,
                                    )
                                }
                                validate={(value) =>
                                    !value
                                        ? 'Шаг не может быть пустым'
                                        : null
                                }
                            />
                            {stepsFields.length > 1 && (
                                <Tooltip
                                    className="capitalize"
                                    color={'danger'}
                                    content={'Удалить'}
                                    placement={'right-end'}
                                >
                                    <Button
                                        color="danger"
                                        variant="light"
                                        onPress={() =>
                                            handleRemoveStepField(
                                                step.id,
                                            )
                                        }
                                        className="w-[50px]"
                                    >
                                        -
                                    </Button>
                                </Tooltip>
                            )}
                        </li>
                    ))}
                </ol>

                {stepsFields.length < 20 && (
                    <Tooltip
                        className="capitalize"
                        color={'primary'}
                        content={'Добавить'}
                        placement={'left-start'}
                    >
                        <Button
                            color="primary"
                            variant="flat"
                            onPress={handleAddStepField}
                        >
                            +
                        </Button>
                    </Tooltip>
                )}
            </div>

            <div className="flex w-full items-center justify-end mt-4">
                <Button
                    color="primary"
                    type="submit"
                    isLoading={isPending}
                >
                    {initialRecipe
                        ? 'Сохранить изменения'
                        : 'Добавить рецепт'}
                </Button>
            </div>
        </Form>
    );
};

export default RecipeForm;
