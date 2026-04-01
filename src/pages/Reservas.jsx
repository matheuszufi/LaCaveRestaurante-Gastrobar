import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { CalendarDays, Clock, Users, User, Phone, Mail, CheckCircle, Loader2 } from 'lucide-react'
import { format, addDays, isBefore, startOfToday } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { createReservation } from '../firebase/reservations'

const reservationSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido').max(15, 'Telefone inválido'),
  guests: z.string().min(1, 'Selecione o número de pessoas'),
  date: z.string().min(1, 'Selecione uma data'),
  time: z.string().min(1, 'Selecione um horário'),
  occasion: z.string().optional(),
  notes: z.string().optional(),
})

const timeSlots = [
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00', '21:30', '22:00', '22:30', '23:00',
]

const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+']

const occasions = [
  'Jantar casual',
  'Aniversário',
  'Romântico',
  'Negócios',
  'Comemoração',
  'Outro',
]

function getAvailableDates() {
  const dates = []
  const today = startOfToday()
  for (let i = 1; i <= 30; i++) {
    const d = addDays(today, i)
    if (d.getDay() !== 1) {
      dates.push(d)
    }
  }
  return dates
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Reservas() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const availableDates = getAvailableDates()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(reservationSchema),
  })

  async function onSubmit(data) {
    setIsSubmitting(true)
    try {
      await createReservation(data)
      setSubmitted(true)
      toast.success('Reserva realizada com sucesso!')
      reset()
    } catch (err) {
      toast.error('Erro ao fazer reserva. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="pt-28 pb-20 px-4 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-12 text-center max-w-lg"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="font-display text-3xl text-white mb-4">Reserva Confirmada!</h2>
          <p className="text-dark-300 font-body mb-8">
            Sua reserva foi registrada com sucesso. Você receberá uma confirmação
            em breve. Aguardamos sua visita!
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-primary">
            Fazer Nova Reserva
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4">Online</p>
          <h1 className="section-title">
            Reserve sua <span className="text-gold-500">Mesa</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Preencha os dados abaixo e garanta seu lugar para uma experiência inesquecível.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          onSubmit={handleSubmit(onSubmit)}
          className="glass-card p-8 md:p-10 space-y-6"
        >
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <User className="w-4 h-4 text-gold-600" /> Nome completo
              </label>
              <input
                {...register('name')}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                placeholder="Seu nome"
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <Mail className="w-4 h-4 text-gold-600" /> E-mail
              </label>
              <input
                {...register('email')}
                type="email"
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                placeholder="seu@email.com"
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Phone & Guests */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <Phone className="w-4 h-4 text-gold-600" /> Telefone
              </label>
              <input
                {...register('phone')}
                type="tel"
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                placeholder="(00) 00000-0000"
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <Users className="w-4 h-4 text-gold-600" /> Número de pessoas
              </label>
              <select
                {...register('guests')}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors appearance-none"
              >
                <option value="">Selecione</option>
                {guestOptions.map((g) => (
                  <option key={g} value={g}>
                    {g} {g === '1' ? 'pessoa' : 'pessoas'}
                  </option>
                ))}
              </select>
              {errors.guests && (
                <p className="text-red-400 text-xs mt-1">{errors.guests.message}</p>
              )}
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <CalendarDays className="w-4 h-4 text-gold-600" /> Data
              </label>
              <select
                {...register('date')}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors appearance-none"
              >
                <option value="">Selecione uma data</option>
                {availableDates.map((d) => (
                  <option key={d.toISOString()} value={format(d, 'yyyy-MM-dd')}>
                    {format(d, "EEEE, dd 'de' MMMM", { locale: ptBR })}
                  </option>
                ))}
              </select>
              {errors.date && (
                <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm text-dark-300 mb-2 font-body">
                <Clock className="w-4 h-4 text-gold-600" /> Horário
              </label>
              <select
                {...register('time')}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors appearance-none"
              >
                <option value="">Selecione um horário</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.time && (
                <p className="text-red-400 text-xs mt-1">{errors.time.message}</p>
              )}
            </div>
          </div>

          {/* Occasion */}
          <div>
            <label className="text-sm text-dark-300 mb-2 font-body block">
              Ocasião (opcional)
            </label>
            <select
              {...register('occasion')}
              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors appearance-none"
            >
              <option value="">Selecione</option>
              {occasions.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="text-sm text-dark-300 mb-2 font-body block">
              Observações (opcional)
            </label>
            <textarea
              {...register('notes')}
              rows={3}
              className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors resize-none"
              placeholder="Alguma restrição alimentar, pedido especial..."
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Enviando...
              </>
            ) : (
              'Confirmar Reserva'
            )}
          </button>

          <p className="text-dark-500 text-xs text-center font-body">
            Ao confirmar, você concorda com nossa política de reservas.
            Cancelamentos com até 2h de antecedência.
          </p>
        </motion.form>
      </div>
    </div>
  )
}
