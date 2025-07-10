import React from 'react'

interface MainLayoutProps {
  children?: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return <main className="space-y-28">{children}</main>
}
export default MainLayout
