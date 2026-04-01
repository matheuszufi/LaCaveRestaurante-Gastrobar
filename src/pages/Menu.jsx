import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wine, Beef, CakeSlice, GlassWater, Salad, Coffee } from 'lucide-react'

const categories = [
  { id: 'entradas', name: 'Entradas', icon: Salad },
  { id: 'principais', name: 'Principais', icon: Beef },
  { id: 'sobremesas', name: 'Sobremesas', icon: CakeSlice },
  { id: 'drinks', name: 'Drinks', icon: GlassWater },
  { id: 'vinhos', name: 'Vinhos', icon: Wine },
  { id: 'cafe', name: 'Café & Chá', icon: Coffee },
]

const menuItems = {
  entradas: [
    { name: 'Bruschetta de Tomate e Manjericão', desc: 'Pão artesanal tostado com tomates frescos, manjericão e azeite trufado', price: 'R$ 32' },
    { name: 'Carpaccio de Wagyu', desc: 'Lâminas finas de wagyu com rúcula, parmesão e molho de alcaparras', price: 'R$ 58' },
    { name: 'Tartar de Atum', desc: 'Atum fresco temperado com gergelim, molho ponzu e chips de wonton', price: 'R$ 52' },
    { name: 'Burrata com Presunto de Parma', desc: 'Burrata cremosa com presunto 24 meses, redução de balsâmico e nozes', price: 'R$ 48' },
    { name: 'Croquetas de Jamón', desc: 'Croquetes cremosos de jamón ibérico com aioli de açafrão', price: 'R$ 38' },
  ],
  principais: [
    { name: 'Filé Mignon ao Molho de Vinho', desc: 'Filé mignon grelhado com redução de vinho tinto, purê de batata trufado e legumes', price: 'R$ 89' },
    { name: 'Risoto de Camarão', desc: 'Arroz arbóreo com camarões salteados, tomate seco e finalizado com mascarpone', price: 'R$ 78' },
    { name: 'Salmão Grelhado', desc: 'Salmão com crosta de ervas, molho de maracujá e aspargos grelhados', price: 'R$ 82' },
    { name: 'Cordeiro com Redução de Menta', desc: 'Carré de cordeiro com crosta de ervas, ratatouille e jus de menta', price: 'R$ 98' },
    { name: 'Gnocchi alla Sorrentina', desc: 'Gnocchi de batata com molho de tomate San Marzano, mozzarella di bufala e manjericão', price: 'R$ 62' },
  ],
  sobremesas: [
    { name: 'Petit Gâteau', desc: 'Bolo quente de chocolate belga com centro cremoso e sorvete de baunilha', price: 'R$ 36' },
    { name: 'Crème Brûlée', desc: 'Creme de baunilha caramelizado com frutas vermelhas', price: 'R$ 32' },
    { name: 'Tiramisù', desc: 'Receita tradicional italiana com mascarpone, café e cacau', price: 'R$ 34' },
    { name: 'Cheesecake de Frutas Vermelhas', desc: 'Cheesecake cremoso com calda de frutas frescas e biscoito amanteigado', price: 'R$ 30' },
  ],
  drinks: [
    { name: 'Cave Negroni', desc: 'Gin, Campari, Vermute Rosso e casca de laranja defumada', price: 'R$ 38' },
    { name: 'Espresso Martini', desc: 'Vodka, licor de café, espresso e baunilha', price: 'R$ 36' },
    { name: 'Aperol Spritz', desc: 'Aperol, espumante, água com gás e fatia de laranja', price: 'R$ 34' },
    { name: 'Old Fashioned Defumado', desc: 'Bourbon, angostura, açúcar demerara e finalização com fumaça de boisé', price: 'R$ 42' },
    { name: 'Mojito La Cave', desc: 'Rum branco, hortelã fresca, limão, açúcar e toque de maracujá', price: 'R$ 32' },
  ],
  vinhos: [
    { name: 'Malbec Reserva - Argentina', desc: 'Notas de ameixa, chocolate e especiarias. Corpo cheio', price: 'R$ 180' },
    { name: 'Chianti Classico - Itália', desc: 'Cereja, ervas e taninos elegantes. Corpo médio', price: 'R$ 220' },
    { name: 'Sauvignon Blanc - Chile', desc: 'Aromas cítricos e herbais, refrescante e mineral', price: 'R$ 140' },
    { name: 'Champagne Brut - França', desc: 'Borbulhas finas, notas de brioche e frutas brancas', price: 'R$ 380' },
    { name: 'Pinot Noir - Nova Zelândia', desc: 'Frutas vermelhas delicadas, elegância e frescor', price: 'R$ 260' },
  ],
  cafe: [
    { name: 'Espresso Duplo', desc: 'Café especial de origem única, torra média', price: 'R$ 12' },
    { name: 'Cappuccino', desc: 'Espresso com leite vaporizado e espuma cremosa', price: 'R$ 16' },
    { name: 'Chá Artesanal', desc: 'Seleção de chás importados - consulte opções', price: 'R$ 14' },
    { name: 'Irish Coffee', desc: 'Café, whiskey irlandês, açúcar e creme', price: 'R$ 28' },
  ],
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.08 },
  }),
}

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('entradas')

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <p className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4">Explore</p>
          <h1 className="section-title">
            Nosso <span className="text-gold-500">Cardápio</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Sabores cuidadosamente selecionados para uma experiência única.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body transition-all duration-300 ${
                activeCategory === cat.id
                  ? 'bg-gold-600 text-white shadow-lg shadow-gold-600/20'
                  : 'bg-dark-900 text-dark-400 hover:text-white hover:bg-dark-800 border border-dark-700'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.name}
            </button>
          ))}
        </div>

        {/* Menu items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {menuItems[activeCategory]?.map((item, i) => (
              <motion.div
                key={item.name}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={i}
                className="glass-card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-gold-600/30 transition-all duration-300"
              >
                <div className="flex-1">
                  <h3 className="font-display text-lg text-white group-hover:text-gold-400 transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-dark-400 text-sm mt-1 font-body">{item.desc}</p>
                </div>
                <span className="font-display text-xl text-gold-500 font-semibold whitespace-nowrap">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
