import { Link } from 'react-router-dom'
import { Instagram, Phone, MapPin, Clock } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-dark-950 border-t border-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/la-cave-logo.png" alt="La Cave" className="h-12 w-auto" />
            </div>
            <p className="text-dark-400 text-sm leading-relaxed">
              Uma experiência gastronômica única, onde sabores se encontram com a
              sofisticação em cada detalhe.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Navegação</h4>
            <div className="space-y-2">
              {[
                { name: 'Início', path: '/' },
                { name: 'Cardápio', path: '/cardapio' },
                { name: 'Reservas', path: '/reservas' },
                { name: 'Sobre', path: '/sobre' },
                { name: 'Contato', path: '/contato' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-dark-400 hover:text-gold-400 text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Horário */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Horário</h4>
            <div className="space-y-2 text-sm text-dark-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                <span>Ter - Sex: 18h - 00h</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                <span>Sáb: 12h - 01h</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gold-600" />
                <span>Dom: 12h - 22h</span>
              </div>
              <p className="text-dark-500 text-xs mt-2">Segunda: Fechado</p>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display text-white text-lg mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-dark-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold-600 mt-0.5 flex-shrink-0" />
                <span>Rua Exemplo, 123 - Centro, Cidade - UF</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-600" />
                <span>(00) 00000-0000</span>
              </div>
              <div className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-gold-600" />
                <span>@lacave.gastrobar</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-dark-800 mt-12 pt-8 text-center">
          <p className="text-dark-500 text-sm">
            © {new Date().getFullYear()} La Cave - Restaurante & Gastrobar. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
