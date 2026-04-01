import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LogOut,
  Calendar,
  Users,
  CheckCircle,
  XCircle,
  Clock,
  Trash2,
  Filter,
  RefreshCw,
} from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import toast from 'react-hot-toast'
import { logoutAdmin } from '../firebase/auth'
import {
  onReservationsSnapshot,
  updateReservationStatus,
  deleteReservation,
} from '../firebase/reservations'

const statusColors = {
  pendente: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
  confirmada: 'bg-green-500/10 text-green-400 border-green-500/30',
  cancelada: 'bg-red-500/10 text-red-400 border-red-500/30',
}

const statusIcons = {
  pendente: Clock,
  confirmada: CheckCircle,
  cancelada: XCircle,
}

export default function Admin() {
  const [reservations, setReservations] = useState([])
  const [filter, setFilter] = useState('todas')
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onReservationsSnapshot(setReservations)
    return unsubscribe
  }, [])

  async function handleLogout() {
    await logoutAdmin()
    navigate('/admin/login')
  }

  async function handleStatus(id, status) {
    try {
      await updateReservationStatus(id, status)
      toast.success(`Reserva ${status}!`)
    } catch {
      toast.error('Erro ao atualizar status.')
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir esta reserva?')) return
    try {
      await deleteReservation(id)
      toast.success('Reserva excluída.')
    } catch {
      toast.error('Erro ao excluir reserva.')
    }
  }

  const filtered =
    filter === 'todas'
      ? reservations
      : reservations.filter((r) => r.status === filter)

  const stats = {
    total: reservations.length,
    pendentes: reservations.filter((r) => r.status === 'pendente').length,
    confirmadas: reservations.filter((r) => r.status === 'confirmada').length,
    canceladas: reservations.filter((r) => r.status === 'cancelada').length,
  }

  return (
    <div className="min-h-screen bg-dark-950">
      {/* Top bar */}
      <header className="bg-dark-900/80 backdrop-blur-md border-b border-dark-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/la-cave-logo.png" alt="La Cave" className="h-8 w-auto" />
            <span className="font-display text-white text-lg">Painel Admin</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-dark-400 hover:text-white text-sm font-body transition-colors"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total', value: stats.total, icon: Calendar, color: 'text-blue-400' },
            { label: 'Pendentes', value: stats.pendentes, icon: Clock, color: 'text-yellow-400' },
            { label: 'Confirmadas', value: stats.confirmadas, icon: CheckCircle, color: 'text-green-400' },
            { label: 'Canceladas', value: stats.canceladas, icon: XCircle, color: 'text-red-400' },
          ].map((s) => (
            <div key={s.label} className="glass-card p-5">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="font-display text-2xl text-white">{s.value}</p>
              <p className="text-dark-400 text-sm font-body">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="flex items-center gap-3 mb-6">
          <Filter className="w-4 h-4 text-dark-400" />
          {['todas', 'pendente', 'confirmada', 'cancelada'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-body capitalize transition-all ${
                filter === f
                  ? 'bg-gold-600 text-white'
                  : 'bg-dark-900 text-dark-400 hover:text-white border border-dark-700'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Reservations list */}
        <div className="space-y-3">
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div className="glass-card p-12 text-center">
                <RefreshCw className="w-10 h-10 text-dark-600 mx-auto mb-4" />
                <p className="text-dark-400 font-body">Nenhuma reserva encontrada.</p>
              </div>
            ) : (
              filtered.map((res) => {
                const StatusIcon = statusIcons[res.status] || Clock
                return (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="glass-card p-5 flex flex-col md:flex-row md:items-center gap-4"
                  >
                    {/* Info */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <p className="text-xs text-dark-500 font-body">Nome</p>
                        <p className="text-white font-body">{res.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-500 font-body">Data / Horário</p>
                        <p className="text-white font-body">
                          {res.date} às {res.time}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-dark-500 font-body">Pessoas</p>
                        <div className="flex items-center gap-1 text-white font-body">
                          <Users className="w-3.5 h-3.5 text-gold-500" /> {res.guests}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-dark-500 font-body">Status</p>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs border ${statusColors[res.status]}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {res.status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {res.status !== 'confirmada' && (
                        <button
                          onClick={() => handleStatus(res.id, 'confirmada')}
                          className="p-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
                          title="Confirmar"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {res.status !== 'cancelada' && (
                        <button
                          onClick={() => handleStatus(res.id, 'cancelada')}
                          className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                          title="Cancelar"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(res.id)}
                        className="p-2 rounded-lg bg-dark-800 text-dark-400 hover:text-red-400 hover:bg-dark-700 transition-colors"
                        title="Excluir"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
