'use client'
import { useSearchParams } from 'next/navigation'
import {RegisterForm} from './form'

export default function Register() {
  const searchParams = useSearchParams()

  const email = searchParams.get('email') || undefined

  return (
    <main>
      <h1>Register page</h1>
      <RegisterForm defaultValues={{email}}/>
    </main>
  )
}
