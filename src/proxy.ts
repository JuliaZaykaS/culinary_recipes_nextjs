import { NextRequest, NextResponse } from 'next/server';
import { getToken, GetTokenParams } from 'next-auth/jwt';
import { PROTECTED_ROUTES } from './constants/routes';
import { siteConfig } from './config/site.config';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    let params: GetTokenParams = {
        req: request,
        secret: process.env.AUTH_SECRET ?? 'secret',
    };

    if (process.env.NODE_ENV === 'production') {
        params = {
            ...params,
            cookieName: '__Secure-authjs.session-token',
        };
    }

    // извлекаем токен из куки и расшифровываем его, проверяем срок действия
    const token = await getToken(params);

    // проверяем, является ли запрашиваемый путь защищенным
    if (
        PROTECTED_ROUTES.some((route) =>
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
                siteConfig.routingInfo.insufficientRights,
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
