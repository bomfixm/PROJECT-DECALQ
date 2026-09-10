import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

import SmoothScroll from '@/components/layout/SmoothScroll'
import ScrollManager from '@/components/layout/ScrollManager'
import Layout from '@/components/layout/Layout'
import PageTransition from '@/components/layout/PageTransition'

import Home from '@/pages/Home'
import Shop from '@/pages/Shop'
import Product from '@/pages/Product'
import About from '@/pages/About'
import Account from '@/pages/Account'
import NotFound from '@/pages/NotFound'

export default function App() {
  const location = useLocation()

  return (
    <SmoothScroll>
      <ScrollManager />
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
            <Route path="/produto/:slug" element={<PageTransition><Product /></PageTransition>} />
            <Route path="/sobre" element={<PageTransition><About /></PageTransition>} />
            <Route path="/conta" element={<PageTransition><Account /></PageTransition>} />
            <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </SmoothScroll>
  )
}
