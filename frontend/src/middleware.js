import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { parse, serialize } from 'cookie';

const secret = 'your_jwt_secret'; // Replace with your actual JWT secret

// Function to create a new token
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
    // Decode token without verification
    const decodedToken = jwt.decode(token);
    if (!decodedToken) {
      throw new Error('Invalid token');
    }

    // Check token expiration
    const now = Math.floor(Date.now() / 1000); // Current time in seconds
    const expiresIn = decodedToken.exp - now;

    // If the token expires in less than 5 minutes, generate a new token
    const refreshThreshold = 5 * 60; // 5 minutes in seconds
    if (expiresIn < refreshThreshold) {
      const newToken = createToken(
        { userId: decodedToken.userId }, // Use the necessary payload
        secret,
        { expiresIn: '1h' } // Set the token expiration time
      );

      // Set the new token in the response cookies
      const response = NextResponse.next();
      response.headers.set('Set-Cookie', serialize('token', newToken, {
        httpOnly: true,
        maxAge: 60 * 60, // 1 hour in seconds
        path: '/',
      }));

      return response;
    }

    // If necessary, you can perform additional validation here
    // For example, check if the token is issued by a trusted issuer

  } catch (err) {
    console.error('JWT decoding failed:', err);
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/chat', '/feed', '/profiles'],
};
