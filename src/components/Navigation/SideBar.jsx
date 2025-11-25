import { Link } from "react-router-dom";
import styles from "./SideBar.module.css";

export default function SideBar() {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>TestWeaver</div>

            <nav className={styles.menu}>
                <Link to="/projects" className={styles.item}>
                    Projects
                </Link>
                <Link to="/docs" className={styles.item}>
                    Docs
                </Link>
                <Link to="/setting" className={styles.item}>
                    Setting
                </Link>
                <Link to="/help" className={styles.item}>
                    Help
                </Link>
            </nav>
        </aside>
    );
}
