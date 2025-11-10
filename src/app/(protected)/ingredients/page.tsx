'use client';
import IngredientsTable from '@/components/ui/tables/Ingredients';
import IngredientForm from '@/forms/ingredient';

const IngredientsPage = () => {
    return (
        <div>
            <IngredientForm />
            <IngredientsTable />
        </div>
    );
};

export default IngredientsPage;
