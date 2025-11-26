import { addToast } from '@heroui/react';

export function getSuccessToast(text: string) {
    return addToast({
        title: 'Ура!!!',
        description: text,
        color: 'success',
    });
}
export function getDangerToast(text: string) {
    return addToast({
        title: 'Ура!!!',
        description: text,
        color: 'danger',
    });
}
