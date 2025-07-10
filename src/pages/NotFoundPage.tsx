import React from 'react'
import { useRouter } from '@routes'

const NotFoundPage: React.FC = () => {
  const { navigate } = useRouter()

  const handleGoHome = () => {
    navigate('/')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary text-text p-4 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold text-red-500 mb-4">
        404
      </h1>

      <h2 className="text-3xl md:text-5xl font-bold text-text-muted mb-6">
        Página Não Encontrada
      </h2>

      <p className="text-lg md:text-xl text-text-muted max-w-xl leading-relaxed mb-8">
        Parece que a página que você está procurando não existe ou foi movida.
        Não se preocupe, isso acontece!
      </p>

      <button
        onClick={handleGoHome}
        className="px-6 py-3 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 ease-in-out text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        Voltar para a Página Inicial
      </button>
    </div>
  )
}

export default NotFoundPage
