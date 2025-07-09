import { MainLayoutProps } from '@/types/layout'
import React from 'react'

const MainLayout: React.FC<MainLayoutProps> = ({ sections = [], children }) => {
  return (
    <div className="min-h-screen">
      {/* Conteúdo principal */}
      <main>
        {sections.length > 0 ? (
          sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className={`min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 ${
                index % 2 === 0 ? 'bg-white' : 'bg-slate-50'
              }`}
            >
              <div className="max-w-7xl mx-auto w-full">{section.content}</div>
            </section>
          ))
        ) : (
          <div className="min-h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full">{children}</div>
          </div>
        )}
      </main>
    </div>
  )
}

export default MainLayout
