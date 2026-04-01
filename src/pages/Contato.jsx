import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Instagram, Send, Loader2 } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { addDoc, collection, Timestamp } from 'firebase/firestore'
import { db } from '../firebase/config'

const contactSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  subject: z.string().min(3, 'Assunto deve ter pelo menos 3 caracteres'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

const infoItems = [
  {
    icon: MapPin,
    title: 'Endereço',
    lines: ['Rua Exemplo, 123', 'Centro, Cidade - UF', 'CEP: 00000-000'],
  },
  {
    icon: Phone,
    title: 'Telefone',
    lines: ['(00) 00000-0000', '(00) 0000-0000'],
  },
  {
    icon: Mail,
    title: 'E-mail',
    lines: ['contato@lacave.com.br', 'reservas@lacave.com.br'],
  },
  {
    icon: Clock,
    title: 'Horário',
    lines: ['Ter - Sex: 18h - 00h', 'Sáb: 12h - 01h', 'Dom: 12h - 22h', 'Seg: Fechado'],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function Contato() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  async function onSubmit(data) {
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'messages'), {
        ...data,
        createdAt: Timestamp.now(),
      })
      toast.success('Mensagem enviada com sucesso!')
      reset()
    } catch {
      toast.error('Erro ao enviar mensagem. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4">Fale conosco</p>
          <h1 className="section-title">
            Entre em <span className="text-gold-500">Contato</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Estamos à disposição para atendê-lo. Envie sua mensagem ou visite-nos.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info cards */}
          <div className="lg:col-span-2 space-y-4">
            {infoItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-6 flex gap-4 group hover:border-gold-600/30 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-gold-600/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-gold-500" />
                </div>
                <div>
                  <h3 className="font-display text-white mb-1">{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line} className="text-dark-400 text-sm font-body">{line}</p>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Social */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="glass-card p-6"
            >
              <h3 className="font-display text-white mb-3">Siga-nos</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-dark-800 flex items-center justify-center text-dark-400 hover:bg-gold-600 hover:text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <motion.form
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            onSubmit={handleSubmit(onSubmit)}
            className="lg:col-span-3 glass-card p-8 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm text-dark-300 mb-2 font-body block">Nome</label>
                <input
                  {...register('name')}
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                  placeholder="Seu nome"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className="text-sm text-dark-300 mb-2 font-body block">E-mail</label>
                <input
                  {...register('email')}
                  type="email"
                  className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                  placeholder="seu@email.com"
                />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm text-dark-300 mb-2 font-body block">Assunto</label>
              <input
                {...register('subject')}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors"
                placeholder="Assunto da mensagem"
              />
              {errors.subject && <p className="text-red-400 text-xs mt-1">{errors.subject.message}</p>}
            </div>

            <div>
              <label className="text-sm text-dark-300 mb-2 font-body block">Mensagem</label>
              <textarea
                {...register('message')}
                rows={5}
                className="w-full bg-dark-900 border border-dark-700 rounded-lg px-4 py-3 text-white font-body focus:outline-none focus:border-gold-600 transition-colors resize-none"
                placeholder="Escreva sua mensagem..."
              />
              {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4" /> Enviar Mensagem
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </div>
  )
}
