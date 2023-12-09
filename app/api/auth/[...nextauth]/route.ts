import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { BACKEND_URL } from '@/lib/constant';
import { JWT } from 'next-auth/jwt';

async function refreshToken(token: JWT): Promise<JWT> {
    const res = await fetch(BACKEND_URL + '/auth/refresh', {
        method: 'POST',
        headers: {
            authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
    });

    const response = await res.json();

    return {
        ...token,
        backendTokens: response,
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                    placeholder: 'name@example.com',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            async authorize(credentials, req) {
                if (!credentials?.email || !credentials.password) {
                    return null;
                }

                const { email, password } = credentials;

                const res = await fetch(BACKEND_URL + '/auth/login-admin', {
                    method: 'POST',
                    body: JSON.stringify({
                        email,
                        password,
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (res.status === 401 || res.status === 500) {
                    return null;
                }
                const user = await res.json();
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) return { ...token, ...user };
            if (new Date().getTime() < token.backendTokens.expiresIn) {
                return token;
            }
            return await refreshToken(token);
        },

        async session({ token, session }) {
            session.user = token.user;
            session.backendTokens = token.backendTokens;
            return session;
        },
    },
    debug: process.env.NODE_ENV === 'development',
    secret: process.env.NEXT_AUTH_SECRET,
    pages: {
        signIn: '/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
