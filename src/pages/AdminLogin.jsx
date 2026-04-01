import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Lock, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { loginAdmin } from '../firebase/auth'

const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
})

export default function AdminLogin() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  async function onSubmit(data) {
    setIsLoading(true)
    try {
      await loginAdmin(data.email, data.password)
      toast.success('Login realizado!')
      navigate('/admin')
    } catch {
      toast.error('E-mail ou senha incorretos.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-10 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <img src="/images/la-cave-logo.png" alt="La Cave" className="h-14 w-auto mx-auto mb-3" />
          <h1 className="font-display text-2xl text-white">Painel Admin</h1>
          <p className="text-dark-400 text-sm font-body mt-1">La Cave - Restaurante & Gastrobar</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="text-sm text-dark-300 mb-2 font-body block">E-mail</label>
            <input
              {...register('email')}
              type="email"
              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
              placeholder="admin@lacave.com.br"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="text-sm text-dark-300 mb-2 font-body block">Senha</label>
            <input
              {...register('password')}
              type="password"
              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" /> Entrar
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
