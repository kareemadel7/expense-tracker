'use server';
import bcrypt from "bcrypt"
import { cookies } from "next/headers";
import { cache } from "react";
import * as jose from 'jose'

interface JWTPayload {
    userId: string
    [key: string]: string | number | boolean | null | undefined
  }

  const JWT_SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'your-secret-key-min-32-chars-long!!!'
  )

export const comparePassword = async (password: string, hash: string) => {
    return await bcrypt.compare(password , hash)
}

export const hashPassword =  async (password: string) => {
    return await bcrypt.hash(password , 5)
}

export const createJWT = async (user: any) => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    const token = await new jose.SignJWT({userId: user.id , email: user.email})
        .setProtectedHeader({ alg: 'HS256' })
        .sign(JWT_SECRET)
    return token
}


export async function createSession(user: any) {
    try {
      // Create JWT with user data
      const token = await createJWT(user)
  
      // Store JWT in a cookie
      const cookieStore = await cookies()
      cookieStore.set({
        name: 'auth_token',
        value: token,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        sameSite: 'lax',
      })
  
      return true
    } catch (error) {
      console.error('Error creating session:', error)
      return false
    }
  }
  
  export async function verifyJWT(token: string): Promise<JWTPayload | null> {
    try {
      const { payload } = await jose.jwtVerify(token, JWT_SECRET)
      return payload as JWTPayload
    } catch (error) {
      console.error('JWT verification failed:', error)
      return null
    }
  }

  // Get current session from JWT
  export const getSession = cache(async () => {
    try {
      const cookieStore = await cookies()
      const token = cookieStore.get('auth_token')?.value
  
      if (!token) return null
      const payload = await verifyJWT(token)
      return payload ? { userId: payload.userId } : null
    } catch (error) {
      // Handle the specific prerendering error
      if (
        error instanceof Error &&
        error.message.includes('During prerendering, `cookies()` rejects')
      ) {
        console.log(
          'Cookies not available during prerendering, returning null session'
        )
        return null
      }
  
      console.error('Error getting session:', error)
      return null
    }
  })
  
  // Delete session by clearing the JWT cookie
  export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
  }