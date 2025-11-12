export const siteConfig = {
    title: 'Рецепты',
    description: 'Рецепты народов мира',

    navItems: [
        { href: '/', label: 'Рецепты' },
        { href: '/ingredients', label: 'Ингредиенты' },
        { href: '/about', label: 'О нас' },
    ],

    pagesContent: {
        '/': {
            content: 'Здесь будут рецепты...',
        },
        '/ingredients': {
            content: 'Здесь будут ингредиенты...',
        },
        '/about': {
            content: `
            <p>Наш сайт — для всех, кто любит еду и хорошее настроение. </p>
            <p>Если у вас не получается идеально — не страшно! Иногда самые смешные кулинарные эксперименты становятся лучшими рецептами. </p>
            <p>Готовим с радостью и без лишнего пафоса!</p>`,
        },
    },

    routingInfo: {
        insufficientRights: 'Недостаточно прав',
        notFoundPage: 'Страница не найдена',
    },

    errors: {
        user: {
            auth: 'Ошибка авторизации',
            signIn: 'Ошибка регистрации',
            noMatchPassword: 'Пароли не совпадают',
            inappropriateLength:
                'Пароль должен быть не меньше 6 символов',
            emailExists:
                'Пользователь с таким email уже существует',
            requiredFields: 'Email и пароль обязательны',
            incorrectData: 'Неверный ввод данных',
        },
        recipe: {
            loading: 'Ошибка при загрузке рецептов',
            create: 'Ошибка при создании рецепта',
            update: 'Ошибка при обновлении рецепта',
            delete: 'Ошибка при удалении рецепта',
            requiredFields:
                'Имя и хотя бы один ингредиент обязательны',
        },
        ingredient: {
            loading: 'Ошибка при получении ингредиентов',
            create: 'Ошибка при создании ингредиента',
            delete: 'Ошибка при удалении ингредиента',
        },
    },

    alerts: {
        ingredient: {
            addIngredientSuccess:
                'Ингредиент успешно добавлен',
            addIngredientError:
                'Ошибка при создании ингредиента',
        },
    },
};
