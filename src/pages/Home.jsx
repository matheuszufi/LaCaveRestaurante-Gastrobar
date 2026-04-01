import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Star, Users, Wine, UtensilsCrossed } from 'lucide-react'
import { useHeroContext } from '../components/HeroContext'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: 'easeOut' },
  }),
}

const features = [
  {
    icon: UtensilsCrossed,
    title: 'Gastronomia Autoral',
    desc: 'Pratos exclusivos criados pelo nosso chef com ingredientes selecionados.',
  },
  {
    icon: Wine,
    title: 'Carta de Vinhos',
    desc: 'Seleção curada de rótulos nacionais e internacionais para harmonizar.',
  },
  {
    icon: Users,
    title: 'Ambiente Exclusivo',
    desc: 'Espaço intimista e sofisticado para momentos especiais.',
  },
  {
    icon: Star,
    title: 'Drinks Autorais',
    desc: 'Coquetelaria criativa com ingredientes frescos e combinações únicas.',
  },
]

export default function Home() {
  useHeroContext()

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950 z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
      </section>

      {/* Features */}
      <section className="py-24 px-4" style={{ backgroundColor: 'rgb(245, 234, 218)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Título à esquerda */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h2 variants={fadeUp} className="font-display text-3xl md:text-4xl lg:text-5xl font-normal text-dark-900">
                Por que escolher a <span className="font-bold text-gold-600">La Cave</span>?
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-dark-600 text-lg mt-4 font-body leading-relaxed">
                Cada detalhe pensado para proporcionar uma experiência gastronômica completa.
              </motion.p>
              <motion.div variants={fadeUp} custom={2}>
                <Link to="/contato" className="inline-block mt-6 text-sm px-6 py-3 border border-amber-800 bg-transparent text-dark-900 rounded-none uppercase tracking-wider hover:bg-amber-800 hover:text-white transition-colors duration-300">
                  ENTRAR EM CONTATO
                </Link>
              </motion.div>
            </motion.div>

            {/* Vídeo à direita */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="overflow-hidden shadow-2xl"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto max-h-screen object-cover"
              >
                <source src="/videos/la-cave-propaganda.mp4" type="video/mp4" />
              </video>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="section-title">
              Reserve sua <span className="text-gold-500">experiência</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="section-subtitle mx-auto mb-10">
              Garanta sua mesa e desfrute de uma noite especial na La Cave. Reservas
              rápidas e práticas pelo nosso sistema online.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link to="/reservas" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
                Fazer Reserva
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
