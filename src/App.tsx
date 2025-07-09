import React from 'react'
import { RouterProvider } from './routes'
import { Routes } from './routes/routes'
import MainLayout from './layouts/MainLayout'

// ============= COMPONENTE APP PRINCIPAL =============
const App: React.FC = () => {
  return (
    <RouterProvider>
      <MainLayout>
        <Routes />
      </MainLayout>
    </RouterProvider>
  )
}

export default App
