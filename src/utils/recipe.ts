export function getIngredientsArrayFromFormData(
    formData: FormData,
) {
    return Array.from(formData.entries())
        .filter(([key]) => key.startsWith('ingredient_'))
        .map(([key, value]) => ({
            ingredientId: value as string,
            quantity: parseFloat(
                formData.get(
                    `quantity_${key.split('_')[1]}`,
                ) as string,
            ),
        }));
}
export function getStepsArrayFromFormData(
    formData: FormData,
) {
    return Array.from(formData.entries())
        .filter(([key]) => key.startsWith('step_'))
        .map(([, value]) => value);
}
