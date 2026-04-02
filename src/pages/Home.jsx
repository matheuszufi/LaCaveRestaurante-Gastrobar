import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
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

const pratosImages = ['/images/pratos-1.png', '/images/pratos-2.png', '/images/pratos-3.png']

export default function Home() {
  useHeroContext()

  const [pratoIndex, setPratoIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setPratoIndex((prev) => (prev + 1) % pratosImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

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
        <div className="relative z-20 mt-auto mb-8 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-body text-sm md:text-base text-white/80 tracking-wider uppercase"
          >
            onde a culinária mediterrânea encontra o terroir catarinense
          </motion.p>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 px-4" style={{ backgroundColor: 'rgb(245, 234, 218)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: '/images/cardapio.png', label: 'CARDÁPIO' },
              { img: '/images/vinhos.png', label: 'VINHOS' },
              { img: '/images/eventos.png', label: 'EVENTOS' },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center group cursor-pointer"
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <button className="w-full py-2 font-display text-lg tracking-widest text-dark-900 uppercase border border-transparent transition-all duration-300 group-hover:border-amber-800 group-hover:text-amber-800">
                  {item.label}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Happy Hour & Música */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/musica-ao-vivo.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-dark-950/80" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Imagem à esquerda */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden"
            >
              <AnimatePresence>
                <motion.img
                  key={pratoIndex}
                  src={pratosImages[pratoIndex]}
                  alt="Pratos La Cave"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50, position: 'absolute', top: 0, left: 0, right: 0 }}
                  transition={{ duration: 0.6 }}
                  className="w-2/3 h-auto object-contain mx-auto"
                />
              </AnimatePresence>
            </motion.div>

            {/* Texto à direita */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="px-4"
            >
              <p className="font-display text-sm tracking-widest text-dark-300 uppercase mb-4">De Terça a sexta das 17:00 às 19:30h</p>
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-4">Happy Hour</h3>
              <p className="font-body text-dark-300 text-sm leading-relaxed mb-8">
                50% de desconto em drinks selecionados e nos vinhos do dia em taça (consultar opções).
              </p>
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-4">La Cave Convida</h3>
              <p className="font-body text-dark-300 text-sm leading-relaxed mb-8">
                Sempre uma atração musical diferente a partir das 21:00.
              </p>
              <h3 className="font-display text-2xl font-bold text-white uppercase tracking-wider mb-6">Música ao Vivo</h3>
              <div className="font-body text-dark-300 text-sm leading-relaxed space-y-6">
                <div>
                  <p className="font-bold text-white">Quinta</p>
                  <p>La Cave convida</p>
                  <p>Sempre uma atração musical diferente a partir das 21:00.</p>
                </div>
                <div>
                  <p className="font-bold text-white">Sexta</p>
                  <p>Blues & Soul a partir das 20:30.</p>
                </div>
                <div>
                  <p className="font-bold text-white">Sábado</p>
                  <p>Duo de Jazz ao vivo a partir das 20:30.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="section-title">
              Reserve sua <span className="font-script text-gold-500">experiência</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="section-subtitle mx-auto mb-10">
              Garanta sua mesa e desfrute de uma noite especial na La Cave. Reservas
              rápidas e práticas pelo nosso sistema online.
            </motion.p>
            <motion.div variants={fadeUp} custom={2}>
              <Link to="/reservas" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4 rounded-none">
                Fazer Reserva
                <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
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
                Por que escolher a <span className="font-script text-gold-600">La Cave</span>?
              </motion.h2>
              <motion.p variants={fadeUp} custom={1} className="text-dark-600 text-lg mt-4 font-body leading-relaxed">
                Cada detalhe pensado para proporcionar uma experiência gastronômica completa.
              </motion.p>

              <motion.div variants={fadeUp} custom={2} className="mt-8 space-y-6 text-dark-700 font-body text-sm leading-relaxed">
                <div>
                  <p className="font-display text-base font-bold text-dark-900 uppercase tracking-wider mb-1">Localização</p>
                  <p>Rua Demétrio Ribeiro, 51</p>
                  <p>Koerich Beira Mar Office</p>
                  <p className="mt-1 italic font-bold">Estacionamento Rotativo no local</p>
                </div>
                <div>
                  <p className="font-display text-base font-bold text-dark-900 uppercase tracking-wider mb-1">Funcionamento</p>
                  <p><strong>Almoço:</strong> Terça a sábado das 11:30 às 15:30</p>
                  <p><strong>Jantar:</strong> Terça a sábado das 16h às 00:30</p>
                </div>
                <hr className="border-t border-dark-300" />
                <div className="overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3536.30164272625!2d-48.543939699999996!3d-27.5841763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x952738168b8ae61f%3A0x980f1fd4e74401c2!2sLa%20Cave%20Gastronomia%20e%20Vinhos!5e0!3m2!1spt-BR!2sbr!4v1775090291590!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="250"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização La Cave"
                  />
                </div>
              </motion.div>

              <motion.div variants={fadeUp} custom={3}>
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
    </>
  )
}
