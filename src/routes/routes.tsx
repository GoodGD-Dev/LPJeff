import React, { useEffect } from 'react'
import { useRouter } from './index'
import Home from '@pages/Home'
import NotFoundPage from '@pages/NotFoundPage'
import { TestPage } from '@/pages/Test'

interface RouteConfig {
  path: string
  component: React.ComponentType<any>
  title?: string
}

const routesConfig: RouteConfig[] = [
  {
    path: '/',
    component: Home,
    title: 'Home - Sua Marca por Intenção'
  },
  {
    path: '/test',
    component: TestPage,
    title: 'Test - Sua Marca por Intenção'
  }
]

export const Routes: React.FC = () => {
  const { currentRoute } = useRouter()

  const currentRouteConfig = routesConfig.find(
    (route) => route.path === currentRoute
  )

  useEffect(() => {
    if (currentRouteConfig?.title) {
      document.title = currentRouteConfig.title
    }
  }, [currentRouteConfig?.title])

  if (!currentRouteConfig) {
    return <NotFoundPage />
  }

  const Component = currentRouteConfig.component

  return <Component />
}

export default Routes
