import styles from "./Layout.module.css"

function Layout({children}) {
  return <>
    <header className={styles.header}>
        <h1>Crypto App</h1>
    </header>
    {children}
    <footer>
        <h2 className={styles.footer}>Developed by Pezhman with ❤️</h2>
    </footer>
  </>
}

export default Layout