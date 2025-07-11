import { Icon } from '@ui'

export const lists = {
  benefits: [
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
  ],
  steps: [
    'Entrevistas Internas',
    'Análise de Concorrentes',
    'Pesquisa de Público',
    'Definição Estratégica',
    'Desenvolvimento Visual',
    'Ampliação Visual',
    'Refinamento Visual',
    'Sintetização do Manual',
    'Organização e Entrega'
  ],
  accordion: [
    {
      title: 'Estratégia e Posicionamento',
      icon: <Icon type="chess" />,
      content: (
        <div className="p-4">
          <p>
            Um diagnóstico profundo que define seu lugar único no mercado, a
            personalidade da sua marca e a mensagem que vai atrair os clientes
            certos para sua empresa.
          </p>
        </div>
      )
    },
    {
      title: 'Logotipo Feito a Mão',
      icon: <Icon type="pencil-ruler" />,
      content: (
        <div className="p-4">
          <p>
            Criação artesanal e exclusiva do seu logotipo, desenvolvido
            especificamente para sua marca com técnicas profissionais de design.
          </p>
        </div>
      )
    },
    {
      title: 'Paleta de Cores Selecionada',
      icon: <Icon type="color-picker" />,
      content: (
        <div className="p-4">
          <p>
            Seleção estratégica de cores que transmitem os valores da sua marca
            e conectam com seu público-alvo de forma psicológica.
          </p>
        </div>
      )
    },
    {
      title: 'Tipografia Curada',
      icon: <Icon type="letter-spacing" />,
      content: (
        <div className="p-4">
          <p>
            Escolha cuidadosa de fontes que complementam sua identidade visual e
            garantem legibilidade em todos os pontos de contato.
          </p>
        </div>
      )
    },
    {
      title: 'Elementos Gráficos Exclusivos',
      icon: <Icon type="classify" />,
      content: (
        <div className="p-4">
          <p>
            Desenvolvimento de elementos visuais únicos como padrões, ícones e
            ilustrações que fortalecem a identidade da sua marca.
          </p>
        </div>
      )
    },
    {
      title: 'Diretriz Fotográfica com IA',
      icon: <Icon type="ai" />,
      content: (
        <div className="p-4">
          <p>
            Orientações específicas sobre estilo fotográfico e uso de
            inteligência artificial para manter consistência visual em todas as
            suas imagens.
          </p>
        </div>
      )
    },
    {
      title: 'Manual de Marca Online',
      icon: <Icon type="box" />,
      content: (
        <div className="p-4">
          <p>
            Documento digital completo com todas as diretrizes de uso da sua
            marca, facilitando a aplicação correta em qualquer situação.
          </p>
        </div>
      )
    },
    {
      title: 'Kit de Lançamento',
      icon: <Icon type="certificate2" />,
      content: (
        <div className="p-4">
          <p>
            Conjunto de materiais prontos para o lançamento da sua nova
            identidade, incluindo posts, templates e materiais de divulgação.
          </p>
        </div>
      )
    },
    {
      title: 'Certificado de Anterioridade',
      icon: <Icon type="certificate" />,
      content: (
        <div className="p-4">
          <p>
            Verificação legal que garante a originalidade da sua marca e protege
            contra possíveis conflitos de propriedade intelectual.
          </p>
        </div>
      )
    }
  ]
}
