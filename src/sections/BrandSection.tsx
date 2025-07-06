import Icon from '@/ui/Svgs'
import CardList from '@components/CardList'
import Title from '@ui/Title'
import React from 'react'

// Interfaces para o CardList
interface CardListItem {
  id: string
  icon: React.ReactNode
  text: string
}

// Seção principal
const BrandIntentionSection = () => {
  const listItems: CardListItem[] = [
    {
      id: '1',
      icon: <Icon type="smile" />,
      text: 'Atrai o público que você quer\ne repele o que só busca preço'
    },
    {
      id: '2',
      icon: <Icon type="heart" />,
      text: 'Gera conexão emocional,\nnão apenas transações'
    },
    {
      id: '3',
      icon: <Icon type="flag" />,
      text: 'Justifica seu valor e te tira da guerra com a concorrência'
    },
    {
      id: '4',
      icon: <Icon type="brain" />,
      text: 'Cria uma experiência memorável em cada ponto de contato'
    },
    {
      id: '5',
      icon: <Icon type="eye" />,
      text: 'Transforma clientes em fãs e admiradores da sua marca'
    }
  ]

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16">
      {/* Título da seção */}
      <div className="mb-12">
        <Title
          as="h2"
          size="lg"
          bold
          color="#ffffff"
          align="center"
          className="mb-4"
        >
          O que uma marca com intenção gera:
        </Title>
      </div>

      {/* CardList centralizado */}
      <div className="flex justify-center">
        <CardList items={listItems} className="mx-auto" />
      </div>
    </section>
  )
}

export default BrandIntentionSection
