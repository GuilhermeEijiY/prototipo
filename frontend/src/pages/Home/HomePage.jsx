import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import styles from "./HomePage.module.css"

function HomePage() {
  const navigate = useNavigate()

  return (
    <section className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Bem-vindo ao CasaCerta</h1>
        <p className={styles.subtitle}>
          Descubra a melhor opcao para a aquisicao do seu imovel.
        </p>
        <Button onClick={() => navigate("/simulacao")}>Iniciar Simulação</Button>
      </div>
    </section>
  )
}

export default HomePage
