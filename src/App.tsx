import Card from './components/CardModal'

const StarIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" fill="#ef4444" />
    <path
      d="M15 9l-6 6M9 9l6 6"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
)

function App() {
  return (
    <>
      <Card
        variant="dark"
        icon={StarIcon}
        title="Marca por acaso"
        listItems={[
          'Baseada em "achismos" e tendências.',
          'Copia dos concorrentes.',
          'O design é apenas decoração.'
        ]}
        description={
          <>
            O resultado?
            <br /> <br />
            Atrai curiosos e gera desconfiança.
          </>
        }
      />
    </>
  )
}

export default App
