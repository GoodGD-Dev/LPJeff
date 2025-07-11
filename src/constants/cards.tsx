import { CardData } from '@types'

export const card = {
  cardDarkTitle: 'Marca por acaso',
  cardDarkItems: [
    'Baseada em "achismos" e tendências.',
    'Copia dos concorrentes.',
    'O design é apenas decoração.'
  ],
  cardDarkText: (
    <>
      O resultado?
      <br />
      Atrai curiosos e gera desconfiança.
    </>
  ),
  cardLightTitle: 'Marca com intenção',
  cardLightItems: [
    'Baseada em estratégia.',
    'É autêntica e única.',
    'O design é uma ferramenta de vendas.'
  ],
  cardLightText: (
    <>
      O resultado?
      <br />
      Atrai os clientes certos que pagam.
    </>
  )
}

export const cardList: CardData[] = [
  {
    variant: 'dark',
    iconType: 'x',
    title: 'Freelancer',
    text: 'R$ 600',
    listItems: [
      'Foco no logo barato',
      'Processo superficial',
      'Resultado amador'
    ]
  },
  {
    variant: 'light',
    iconType: 'check',
    title: 'parcer',
    text: 'R$ 12.000',
    listItems: [
      'Foco em estratégia e ROI',
      'Processo de imersão',
      'Resultado profissional'
    ]
  },
  {
    variant: 'dark',
    iconType: 'x',
    title: 'Agência Famosa',
    text: '+R$ 50.000',
    listItems: ['Foco em prêmios', 'Processo burocrático', 'Altíssimo custo']
  }
]
