import styles from "./TestCasesLayout.module.css";
import ProjectTabs from "./TestCasesTabs";

export default function ProjectLayout({ children }) {
    return (
        <div className={styles.container}>
            <aside className={styles.left}>
                <ProjectTabs />
            </aside>

            <section className={styles.right}>
                {children}
            </section>
        </div>
    );
}
