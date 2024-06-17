import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parse, serialize } from 'cookie';

const secret = process.env.JWT_SECRET_KEY;

function createToken(payload, secret, options) {
  return jwt.sign(payload, secret, options);
}

export function middleware(request) {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const cookies = parse(cookieHeader);
  const token = cookies.token;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    const now = Math.floor(Date.now() / 1000); 
    const expiresIn = decodedToken.exp - now;

    const refreshThreshold = 5 * 60;
    if (expiresIn < refreshThreshold) {
      const newToken = createToken(
        { userId: decodedToken.userId }, 
        secret,
        { expiresIn: '1h' } 
      );

      const response = NextResponse.next();
      response.headers.set('Set-Cookie', serialize('token', newToken, {
        httpOnly: true,
        maxAge: 60 * 60, 
        path: '/',
      }));

      return response;
    }

  } catch (err) {
    console.error('JWT decoding failed:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat', '/feed', '/profiles', '/kreiraj_ekipu', '/kreiraj_teren', '/xo'],
};
