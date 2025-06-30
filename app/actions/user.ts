"use server";

import {db} from "../../lib/db";
import { comparePassword, createJWT, createSession, deleteSession, getSession, hashPassword } from "../../lib/auth";
import { cache } from "react";
import { redirect } from "next/navigation";

export const createUser = async (formData: FormData): Promise<{message?: string, error?: string}> => {
    if (!formData.get("email") || !formData.get("password") || !formData.get("firstName") || !formData.get("lastName")) {
        return {error: "All fields are required"}
    }
    const user = await db.user.findUnique({
        where: {
            email: formData.get("email") as string
        }
    })
    if (user) {
        return {error: "User already exists"}
    }
    try {
        const user = await db.user.create({
            data: {
            clerkUserId: "",
            email: formData.get("email") as string,
            password: await hashPassword(formData.get("password") as string),
            name: `${formData.get("firstName")} ${formData.get("lastName")}`,
        },
    })

    await createSession(user)

    return {
      message: 'Account created successfully',
    }
    } catch (error) {
        return {error: "Failed to create user"}
    }
}

export const signin = async (formData: FormData): Promise<{message?: string, error?: string}> => {
    if (!formData.get("email") || !formData.get("password")) {
        return {error: "Email and password are required"}
    }
    
    const user = await db.user.findUnique({
        where: {
            email: formData.get("email") as string
        }
    })

    const isValid = await comparePassword(formData.get("password") as string , user?.password || "")

    if (!isValid) {
        return {error: "password is not valid!"}
    } 
    if (!user) {
        return {error: "user not found!"}
    }
    
    await createSession(user)
   
    return {
      message: 'Signed in successfully',
    }
}

export const getCurrentUser = cache(async () => {
    const session = await getSession()
    if (!session) return null
  
    // Skip database query during prerendering if we don't have a session
    if (
      typeof window === 'undefined' &&
      process.env.NEXT_PHASE === 'phase-production-build'
    ) {
      return null
    }
  
    try {
        const user = await db.user.findUnique({
            where: {
                id: session.userId
            }
        })
  
      return user || null
    } catch (error) {
      console.error('Error getting user by ID:', error)
      return null
    }
  })

  export async function signOut(): Promise<void> {
    try {
      await deleteSession()
    } catch (error) {
      console.error('Sign out error:', error)
      throw new Error('Failed to sign out')
    } finally {
      redirect('/')
    }
  }