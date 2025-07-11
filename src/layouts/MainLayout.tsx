import React from 'react'
import Footer from './Footer'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <main className="space-y-24">{children}</main>
      <Footer />
    </>
  )
}
export default MainLayout
