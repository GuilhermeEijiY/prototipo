import { Link } from "react-router-dom"
import styles from "./Header.module.css"

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          CasaCerta
        </Link>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/simulacao" className={styles.link}>
            Simulação
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
