import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    // export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;
    // извлекаем токен из куки и расшифровываем его, проверяем срок действия
    const token = await getToken({
        req: request,
        secret: process.env.AUTH_SECRET ?? 'secret',
    });
    // создаем массив защищенных путей
    const protectedRoutes = [
        '/ingredients',
        '/recipes/new',
        '/recipes/:path*',
    ];
    // проверяем, является ли запрашиваемый путь защищенным
    if (
        protectedRoutes.some((route) =>
            pathname.startsWith(
                route.replace(':path*', ''),
            ),
        )
    ) {
        // если пользователь не авторизован
        if (!token) {
            // редирект на страницу ошибки
            const url = new URL('/error', request.url);
            url.searchParams.set(
                'message',
                'Недостаточно прав',
            );

            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

// конфигурация middleware

export const config = {
    matcher: [
        '/ingredients',
        '/recipes/new',
        '/recipes/:path*',
    ],
};
