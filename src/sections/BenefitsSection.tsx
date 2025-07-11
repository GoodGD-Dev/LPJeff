import { BenefitsProps, CardListItem } from '@/types'
import Icon from '@/ui/Svgs'
import CardList from '@components/CardList'
import Title from '@ui/Title'
import React from 'react'

// Seção principal
const Benefits: React.FC<BenefitsProps> = ({
  sectionTitle,
  listItems: propListItems
}) => {
  const defaultListItems: CardListItem[] = [
    {
      id: '1',
      icon: <Icon type="smile" />,
      text: 'test1'
    },
    {
      id: '2',
      icon: <Icon type="heart" />,
      text: 'test2'
    },
    {
      id: '3',
      icon: <Icon type="flag" />,
      text: 'test3'
    },
    {
      id: '4',
      icon: <Icon type="brain" />,
      text: 'test4'
    },
    {
      id: '5',
      icon: <Icon type="eye" />,
      text: 'test5'
    }
  ]

  const currentListItems = propListItems || defaultListItems

  return (
    <>
      {/* Título da seção */}
      <div className="mb-8">
        <Title as="h1" align="center">
          {sectionTitle}
        </Title>
      </div>

      {/* CardList centralizado */}
      <div className="flex justify-center">
        <CardList items={currentListItems} className="mx-auto" />
      </div>
    </>
  )
}

export default Benefits
