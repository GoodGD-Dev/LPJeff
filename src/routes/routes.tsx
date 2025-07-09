import React, { useEffect } from 'react'
import { useRouter } from './index'
import Home from '@pages/Home'
import NotFoundPage from '@pages/NotFoundPage'

// ============= TIPOS TYPESCRIPT =============
interface RouteConfig {
  path: string
  component: React.ComponentType<{ id?: string }>
  title?: string
}

// ============= CONFIGURAÇÃO DAS ROTAS =============
const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    title: 'Home - Sua Marca por Intenção'
  }
]

// ============= COMPONENTE ROUTES =============
export const Routes: React.FC = () => {
  const { currentRoute } = useRouter()

  const currentRouteConfig = routesConfig.find(
    (route) => route.path === currentRoute
  )

  // Se a rota não for encontrada, exibe a página 404
  if (!currentRouteConfig) {
    return <NotFoundPage />
  }

  const Component = currentRouteConfig.component

  // Atualizar o título da página
  useEffect(() => {
    if (currentRouteConfig.title) {
      document.title = currentRouteConfig.title
    }
  }, [currentRouteConfig.title])

  return <Component />
}

export default Routes
