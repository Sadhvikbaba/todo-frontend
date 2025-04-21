'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function ProtectedRoute({ children, authentication = true }) {
  const router = useRouter()
  const [loader, setLoader] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (authentication && !token) {
      router.push("/login")
    } else if (!authentication && token) {
      router.push("/todo")
    }

    setLoader(false)
  }, [authentication, router])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}
