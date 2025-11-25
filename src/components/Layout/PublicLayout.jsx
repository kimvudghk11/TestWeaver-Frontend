import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import styles from "./PublicLayout.module.css";

export default function PublicLayout({ children }) {
    const { user, logout } = useAuth();

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
                    {user ? (
                        <>
                            <span className={styles.user}>{user.data.loginId}</span>
                            <button className={styles.logoutBtn} onClick={logout}>Logout</button>
                        </>
                    ) : (
                        <Link to="/auth/login" className={styles.loginBtn}>Login</Link>
                    )}
                </div>
            </header>

            <main className={styles.main}>{children}</main>
        </div>
    );
}