import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useIsHero } from './HeroContext'

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Cardápio', path: '/cardapio' },
  { name: 'Reservas', path: '/reservas' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Contato', path: '/contato' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHero = useIsHero()

  const isHome = location.pathname === '/'
  const showFullNav = !isHome

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
  }, [location])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showFullNav
          ? 'bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20'
          : isHome && scrolled
            ? 'bg-dark-950/70 backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 relative">
          {/* Logo - centered on Home, left on other pages */}
          {isHome ? (
            <div className="absolute left-1/2 -translate-x-1/2">
              <Link to="/">
                <img src="/images/la-cave-logo.png" alt="La Cave" className="h-16 w-auto" />
              </Link>
            </div>
          ) : (
            <Link to="/" className="flex items-center gap-2 group">
              <img src="/images/la-cave-logo.png" alt="La Cave" className="h-14 w-auto" />
            </Link>
          )}

          {/* Spacer to push items right */}
          <div className="flex-1" />

          {/* Desktop nav */}
          {showFullNav && (
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative font-body text-sm uppercase tracking-wider transition-colors duration-300 ${
                    location.pathname === link.path
                      ? 'text-gold-400'
                      : 'text-dark-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gold-500"
                    />
                  )}
                </Link>
              ))}
              <Link to="/reservas" className="btn-primary text-sm">
                Reservar Mesa
              </Link>
            </div>
          )}

          {/* Hamburger button */}
          <button
            className={`text-white p-2 ${showFullNav ? 'md:hidden' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-dark-950/98 backdrop-blur-lg border-t border-dark-800"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block font-body text-lg ${
                    location.pathname === link.path
                      ? 'text-gold-400'
                      : 'text-dark-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/reservas" className="btn-primary block text-center mt-4">
                Reservar Mesa
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
