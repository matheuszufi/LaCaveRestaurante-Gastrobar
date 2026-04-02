import { motion } from 'framer-motion'
import { Award, Heart, Leaf, ChefHat } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15 },
  }),
}

const values = [
  {
    icon: ChefHat,
    title: 'Excelência Culinária',
    desc: 'Nossos chefs combinam técnicas clássicas com criatividade para criar pratos que surpreendem a cada garfada.',
  },
  {
    icon: Leaf,
    title: 'Ingredientes Frescos',
    desc: 'Priorizamos ingredientes de produtores locais e orgânicos, garantindo qualidade e sustentabilidade.',
  },
  {
    icon: Heart,
    title: 'Paixão pelo Serviço',
    desc: 'Cada detalhe é pensado com carinho — da recepção ao último gole — para que você se sinta especial.',
  },
  {
    icon: Award,
    title: 'Tradição & Inovação',
    desc: 'Respeitamos as raízes da gastronomia enquanto buscamos novas formas de encantar seu paladar.',
  },
]

export default function Sobre() {
  return (
    <div className="pt-28 pb-20 px-4 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <p className="text-gold-500 uppercase tracking-[0.3em] text-sm mb-4">Nossa história</p>
          <h1 className="section-title">
            Sobre a <span className="font-script text-gold-500">La Cave</span>
          </h1>
          <p className="section-subtitle mx-auto">
            Conheça a história, a paixão e os valores que fazem da La Cave uma
            experiência gastronômica inesquecível.
          </p>
        </motion.div>

        {/* Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.h2 variants={fadeUp} className="font-display text-3xl text-white mb-6">
              Uma jornada de <span className="font-script text-gold-500">sabores</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={1} className="text-dark-300 font-body leading-relaxed mb-4">
              A La Cave nasceu do sonho de criar um espaço onde a gastronomia
              encontra a arte. Inspirada pelas caves de vinho europeias, nosso
              restaurante traz um ambiente intimista e acolhedor, perfeito para
              quem aprecia boa comida e bons momentos.
            </motion.p>
            <motion.p variants={fadeUp} custom={2} className="text-dark-300 font-body leading-relaxed mb-4">
              Desde nossa inauguração, temos nos dedicado a oferecer uma
              experiência completa: da seleção criteriosa dos ingredientes à
              apresentação impecável de cada prato, passando por uma carta de
              vinhos que celebra os melhores terroirs do mundo.
            </motion.p>
            <motion.p variants={fadeUp} custom={3} className="text-dark-300 font-body leading-relaxed">
              Nosso gastrobar une o melhor da coquetelaria autoral com petiscos
              sofisticados, criando o cenário perfeito para encontros, celebrações
              e momentos inesquecíveis.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Interior do restaurante La Cave"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 glass-card p-6">
              <p className="font-display text-3xl text-gold-500 font-bold">5+</p>
              <p className="text-dark-300 text-sm font-body">Anos de história</p>
            </div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <motion.h2 variants={fadeUp} className="section-title">
            Nossos <span className="font-script text-gold-500">Valores</span>
          </motion.h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              className="glass-card p-8 flex gap-5 group hover:border-gold-600/30 transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-gold-600/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold-600/20 transition-colors">
                <val.icon className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="font-display text-xl text-white mb-2">{val.title}</h3>
                <p className="text-dark-400 text-sm leading-relaxed font-body">{val.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
