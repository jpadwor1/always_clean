import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server';

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/auth-callback',
    '/profile/account/:path*',
    '/profile/billing/:path*',
    '/profile/notifications/:path*',
    '/profile/:path*'
  ],
};

export default authMiddleware;
