import { Link } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export default function AuthLayout({ title, children }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.card}>
                {title && <h2 className={styles.title}>{title}</h2>}

                <div className={styles.content}>{children}</div>

                <div className={styles.footer}>
                    <Link to="/">Home</Link>
                </div>
            </div>
        </div>
    );
}