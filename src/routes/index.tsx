// src/routes/index.tsx
import React, { useState, useEffect, createContext, useContext } from 'react'

interface RouteVisit {
  id: string
  route: string
  source: string
  timestamp: Date
  userAgent: string
}

interface AnalyticsData {
  totalVisits: number
  uniqueVisitors: number
  sourceStats: { [key: string]: number }
  routeStats: { [key: string]: number }
  visits: RouteVisit[]
}

interface RouterContextType {
  currentRoute: string
  navigate: (route: string, source?: string) => void
  analytics: AnalyticsData
}

// ============= CONTEXT DO ROUTER =============
const RouterContext = createContext<RouterContextType | undefined>(undefined)

// ============= HOOK PERSONALIZADO =============
export const useRouter = () => {
  const context = useContext(RouterContext)
  if (!context) {
    throw new Error('useRouter deve ser usado dentro de um RouterProvider')
  }
  return context
}

// ============= ROUTER PROVIDER =============
export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [currentRoute, setCurrentRoute] = useState(
    () => window.location.pathname
  )
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalVisits: 0,
    uniqueVisitors: 0,
    sourceStats: {},
    routeStats: {},
    visits: []
  })

  const detectSource = (): string => {
    const params = new URLSearchParams(window.location.search)
    const utmSource = params.get('utm_source')
    const ref = params.get('ref')

    if (utmSource) return utmSource
    if (ref) return ref

    const referrer = document.referrer
    if (referrer.includes('instagram.com')) return 'instagram'
    if (referrer.includes('facebook.com')) return 'facebook'
    if (referrer.includes('twitter.com')) return 'twitter'
    if (referrer.includes('google.com')) return 'google'
    if (referrer.includes('youtube.com')) return 'youtube'
    if (referrer.includes('whatsapp.com')) return 'whatsapp'
    if (referrer.includes('t.me')) return 'telegram'

    return referrer ? 'external' : 'direct'
  }

  const navigate = (route: string, source?: string) => {
    window.history.pushState({}, '', route)

    const detectedSource = source || detectSource()
    const visit: RouteVisit = {
      id: Date.now().toString(),
      route,
      source: detectedSource,
      timestamp: new Date(),
      userAgent: navigator.userAgent
    }

    setAnalytics((prev) => {
      const newVisits = [...prev.visits, visit]
      const sourceStats = { ...prev.sourceStats }
      const routeStats = { ...prev.routeStats }

      sourceStats[detectedSource] = (sourceStats[detectedSource] || 0) + 1
      routeStats[route] = (routeStats[route] || 0) + 1

      const uniqueVisitors = new Set(newVisits.map((v) => v.userAgent)).size

      return {
        totalVisits: prev.totalVisits + 1,
        uniqueVisitors,
        sourceStats,
        routeStats,
        visits: newVisits
      }
    })

    setCurrentRoute(route)
  }

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  useEffect(() => {
    const initialRoute = window.location.pathname
    navigate(initialRoute, detectSource())
  }, [])

  return (
    <RouterContext.Provider value={{ currentRoute, navigate, analytics }}>
      {children}
    </RouterContext.Provider>
  )
}
