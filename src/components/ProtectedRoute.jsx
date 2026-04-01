import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { onAuthChange } from '../firebase/auth'

export default function ProtectedRoute({ children }) {
  const [user, setUser] = useState(undefined)

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => setUser(u))
    return unsubscribe
  }, [])

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />
  }

  return children
}
