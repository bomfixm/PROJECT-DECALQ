/* ============================================================
   Mock catalogue — DECALQ
   Swap `images` paths for real photography later. Keep the
   file:  product-XX-a.jpg (front) / product-XX-b.jpg (hover).
   ============================================================ */

import { normalize } from '@/utils/format'

const TEE_SIZES = ['P', 'M', 'G', 'GG']
const ONE_SIZE = ['ÚNICO']

export const products = [
  {
    id: 'tee-01',
    slug: 'camiseta-decalq-01',
    name: 'CAMISETA DECALQ 01',
    category: 'camisetas',
    categoryLabel: 'Camiseta',
    price: 149.9,
    isNew: true,
    colorway: 'Off-White',
    images: ['/images/product-01-a.jpg', '/images/product-01-b.jpg'],
    sizes: TEE_SIZES,
    description:
      'Malha pesada, caimento reto e um pouco largo. A base do guarda-roupa — feita pra rodar todo dia sem pedir licença.',
    details: [
      'Algodão penteado 100% — 220 g/m²',
      'Modelagem oversized, ombro caído',
      'Serigrafia à base d’água',
      'Costura reforçada na gola',
      'Feito no Brasil',
    ],
  },
  {
    id: 'tee-02',
    slug: 'camiseta-decalq-02',
    name: 'CAMISETA DECALQ 02',
    category: 'camisetas',
    categoryLabel: 'Camiseta',
    price: 149.9,
    isNew: true,
    colorway: 'Preto',
    images: ['/images/product-02-a.jpg', '/images/product-02-b.jpg'],
    sizes: TEE_SIZES,
    description:
      'A 01 no negativo. Preto seco, estampa em alto contraste nas costas. Pra quem prefere dizer menos.',
    details: [
      'Algodão penteado 100% — 220 g/m²',
      'Modelagem oversized, ombro caído',
      'Estampa nas costas',
      'Feito no Brasil',
    ],
  },
  {
    id: 'tee-03',
    slug: 'camiseta-heavy-tee',
    name: 'HEAVY TEE — RUÍDO',
    category: 'camisetas',
    categoryLabel: 'Camiseta',
    price: 169.9,
    isNew: true,
    colorway: 'Cinza Mescla',
    images: ['/images/product-03-a.jpg', '/images/product-03-b.jpg'],
    sizes: TEE_SIZES,
    description:
      'Gramatura alta, toque encorpado. Gráfico “RUÍDO” impresso descolorido, como quem já lavou cem vezes.',
    details: [
      'Algodão 100% — 240 g/m²',
      'Lavagem estonada',
      'Modelagem boxy',
      'Feito no Brasil',
    ],
  },
  {
    id: 'tee-04',
    slug: 'camiseta-longsleeve-transito',
    name: 'MANGA LONGA — TRÂNSITO',
    category: 'camisetas',
    categoryLabel: 'Manga longa',
    price: 199.9,
    isNew: false,
    colorway: 'Off-White',
    images: ['/images/product-04-a.jpg', '/images/product-04-b.jpg'],
    sizes: TEE_SIZES,
    description:
      'Manga longa pra emendar o dia na noite. Punho canelado, gráfico lateral discreto descendo pelo braço.',
    details: [
      'Algodão penteado 100% — 220 g/m²',
      'Punho e gola canelados',
      'Estampa no braço esquerdo',
      'Feito no Brasil',
    ],
  },
  {
    id: 'tee-05',
    slug: 'camiseta-decalq-clssico',
    name: 'CAMISETA CLÁSSICO',
    category: 'camisetas',
    categoryLabel: 'Camiseta',
    price: 129.9,
    isNew: false,
    colorway: 'Branco',
    images: ['/images/product-05-a.jpg', '/images/product-05-b.jpg'],
    sizes: TEE_SIZES,
    description:
      'Wordmark pequeno no peito, nada além disso. A camiseta que combina com qualquer coisa que você já tem.',
    details: [
      'Algodão penteado 100% — 200 g/m²',
      'Modelagem regular',
      'Bordado no peito',
      'Feito no Brasil',
    ],
  },
  {
    id: 'acc-01',
    slug: 'bone-decalq-estampando',
    name: 'BONÉ — ESTAMPANDO AS RUAS',
    category: 'acessorios',
    categoryLabel: 'Boné',
    price: 119.9,
    isNew: true,
    colorway: 'Preto',
    images: ['/images/product-06-a.jpg', '/images/product-06-b.jpg'],
    sizes: ONE_SIZE,
    description:
      'Boné de 6 gomos, aba curva, estrutura macia. Bordado direto e ajuste de fivela metálica.',
    details: [
      'Sarja 100% algodão',
      '6 gomos, aba curva',
      'Bordado frontal',
      'Ajuste de fivela metálica',
    ],
  },
  {
    id: 'acc-02',
    slug: 'meia-decalq-par',
    name: 'MEIA DECALQ — PAR',
    category: 'acessorios',
    categoryLabel: 'Meia',
    price: 49.9,
    isNew: false,
    colorway: 'Branco / Preto',
    images: ['/images/product-07-a.jpg', '/images/product-07-b.jpg'],
    sizes: ONE_SIZE,
    description:
      'Cano médio, punho firme, logo tecido na lateral. Vem em par — óbvio.',
    details: ['Algodão + elastano', 'Cano médio', 'Logo jacquard', 'Tam. 39–44'],
  },
  {
    id: 'acc-03',
    slug: 'ecobag-decalq-lona',
    name: 'ECOBAG DE LONA',
    category: 'acessorios',
    categoryLabel: 'Bolsa',
    price: 89.9,
    isNew: true,
    colorway: 'Cru',
    images: ['/images/product-08-a.jpg', '/images/product-08-b.jpg'],
    sizes: ONE_SIZE,
    description:
      'Lona pesada, alça reforçada, fundo estruturado. Carrega o rolê inteiro e ainda sobra espaço.',
    details: ['Lona de algodão 100%', '38 × 42 cm', 'Alça 70 cm', 'Serigrafia frente e verso'],
  },
  {
    id: 'acc-04',
    slug: 'gorro-decalq-canelado',
    name: 'GORRO CANELADO',
    category: 'acessorios',
    categoryLabel: 'Gorro',
    price: 99.9,
    isNew: false,
    colorway: 'Chumbo',
    images: ['/images/product-09-a.jpg', '/images/product-09-b.jpg'],
    sizes: ONE_SIZE,
    description:
      'Tricô canelado, dobra simples, etiqueta tecida na barra. Pro frio e pra foto.',
    details: ['Acrílico premium', 'Canelado 2×2', 'Etiqueta tecida', 'Tamanho único'],
  },
  {
    id: 'acc-05',
    slug: 'chaveiro-decalq-metal',
    name: 'CHAVEIRO DE METAL',
    category: 'acessorios',
    categoryLabel: 'Chaveiro',
    price: 39.9,
    isNew: true,
    colorway: 'Prata',
    images: ['/images/product-10-a.jpg', '/images/product-10-b.jpg'],
    sizes: ONE_SIZE,
    description:
      'Placa de metal escovado com o wordmark vazado. Pequeno detalhe que denuncia de onde você é.',
    details: ['Zamac escovado', '55 × 20 mm', 'Argola dupla', 'Wordmark vazado'],
  },
]

export const categories = [
  {
    key: 'camisetas',
    label: 'Camisetas',
    caption: 'A base. Malha pesada, estampa seca.',
    image: '/images/category-camisetas.jpg',
    to: '/shop?cat=camisetas',
  },
  {
    key: 'acessorios',
    label: 'Acessórios',
    caption: 'Bonés, bolsas e os detalhes que entregam.',
    image: '/images/category-acessorios.jpg',
    to: '/shop?cat=acessorios',
  },
  {
    key: 'novidades',
    label: 'Latest Drop',
    caption: 'O que acabou de sair. Enquanto dura.',
    image: '/images/category-latest.jpg',
    to: '/shop?cat=novidades',
  },
]

export const getProductBySlug = (slug) => products.find((p) => p.slug === slug)

export const getRelated = (product, limit = 4) =>
  products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .concat(products.filter((p) => p.id !== product.id && p.category !== product.category))
    .slice(0, limit)

export const filterProducts = ({ cat = 'todos', query = '' } = {}) => {
  const q = normalize(query.trim())
  return products.filter((p) => {
    const matchCat =
      cat === 'todos' || (cat === 'novidades' ? p.isNew : p.category === cat)
    const haystack = normalize(`${p.name} ${p.categoryLabel} ${p.colorway}`)
    const matchQuery = !q || q.split(/\s+/).every((token) => haystack.includes(token))
    return matchCat && matchQuery
  })
}
