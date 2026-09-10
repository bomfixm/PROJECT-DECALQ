import Header from '@/components/header/Header'
import MobileMenu from '@/components/header/MobileMenu'
import CartDrawer from '@/components/cart/CartDrawer'
import SearchOverlay from '@/components/search/SearchOverlay'
import Footer from '@/components/footer/Footer'

export default function Layout({ children }) {
  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>

      <Header />
      <MobileMenu />
      <SearchOverlay />
      <CartDrawer />

      {children}

      <Footer />
    </>
  )
}
