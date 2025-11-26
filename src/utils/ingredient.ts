import { UNIT_ABBREVIATIONS } from '@/constants/select-options';

export const getUnitLabel = (unit: string) => {
    const unitOption = UNIT_ABBREVIATIONS.find(
        (option) => option.value === unit,
    );
    return unitOption
        ? unitOption.label
        : unit.toLowerCase();
};
