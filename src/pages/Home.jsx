import HeroSlider from '@/components/hero/HeroSlider'
import EditorialBanner from '@/components/sections/EditorialBanner'
import Marquee from '@/components/sections/Marquee'
import Categories from '@/components/sections/Categories'
import Manifesto from '@/components/sections/Manifesto'
import InstagramGrid from '@/components/sections/InstagramGrid'
import Newsletter from '@/components/sections/Newsletter'
import ProductGrid from '@/components/product/ProductGrid'
import SectionHeading from '@/components/ui/SectionHeading'

import { products } from '@/data/products'
import { site } from '@/data/site'
import s from './Home.module.css'

const newDrop = [...products.filter((p) => p.isNew), ...products.filter((p) => !p.isNew)].slice(0, 8)

export default function Home() {
  return (
    <>
      <HeroSlider />

      <section className={`container ${s.drop}`}>
        <SectionHeading
          tag={`${site.name} / ${site.year}`}
          title="New Drop"
          link={{ to: '/shop', label: 'Ver tudo' }}
        />
        <ProductGrid products={newDrop} priorityCount={4} />
      </section>

      <EditorialBanner />

      <Marquee />

      <section className={`section container`}>
        <SectionHeading tag="Coleção" title="O que rola" />
        <Categories />
      </section>

      <Manifesto />

      <section className="section container">
        <InstagramGrid />
      </section>

      <Newsletter />
    </>
  )
}
