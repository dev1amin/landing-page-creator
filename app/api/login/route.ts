import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  const { password } = await request.json()

  if (password === process.env.ADMIN_PASSWORD) {
    cookies().set('auth_token', process.env.ADMIN_TOKEN!, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    })

    return NextResponse.json({ success: true })
  }

  return NextResponse.json(
    { message: 'Invalid password' },
    { status: 401 }
  )
}

