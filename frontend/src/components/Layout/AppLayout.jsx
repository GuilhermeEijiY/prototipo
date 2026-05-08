import Header from "../Header/Header"
import Footer from "../Footer/Footer"
import styles from "./AppLayout.module.css"

function AppLayout({ children }) {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.mainContent}>{children}</main>
      <Footer />
    </div>
  )
}

export default AppLayout
