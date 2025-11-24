import { Link } from "react-router-dom";
import styles from "./PublicLayout.module.css";

export default function PublicLayout({ children }) {
    return (
        <div className={styles.layout}>
            <header className={styles.header}>
                <div className={styles.left}>
                    <Link to="/" className={styles.logo}>TestWeaver</Link>
                </div>

                <nav className={styles.centerNav}>
                    <Link to="/docs">DOCS</Link>
                    <Link to="/about">ABOUT</Link>
                    <Link to="/help">HELP</Link>
                </nav>

                <div className={styles.right}>
                    <Link to="/auth/login" className={styles.loginBtn}>Login</Link>
                </div>
            </header>

            <main className={styles.main}>{children}</main>
        </div>
    );
}