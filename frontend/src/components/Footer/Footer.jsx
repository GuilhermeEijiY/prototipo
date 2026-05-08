import styles from "./Footer.module.css"

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>CasaCerta © {new Date().getFullYear()} - Simulador Financeiro Imobiliário</p>
      </div>
    </footer>
  )
}

export default Footer
