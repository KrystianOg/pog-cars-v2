'use client'
import { Button } from "@/components/ui/button";
import { post } from "@/lib/fetch";
import { useRouter } from "next/navigation";
import {useSSE} from '@/hooks/useSSE'

export default function VerifyEmail() {
  const router =useRouter()

  useSSE('auth/sse', {
    'verify-email': () => {
      router.push('/login')
    }
  })

  const emitVerify = () => {
    post('/auth/emit', undefined)
  }
  return (
    <div>
      <Button onClick={emitVerify}>EMIT</Button>
    </div>
  )
}
