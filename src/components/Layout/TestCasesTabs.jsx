import { Link, useParams } from "react-router-dom";
import styles from "./TestCasesLayout.module.css";

export default function ProjectTabs() {
    const { id } = useParams();

    const tabs = [
        { name: "Project-List", path: "/projects" },
        { name: "Model", path: `/projects/${id}/config` },
        { name: "Test Cases", path: `/projects/${id}/testcases` },
    ];

    return (
        <nav className={styles.tabs}>
            <h1 className={styles.title}>TestWeaver</h1>

            <p className={styles.info}>Info</p>
            {tabs.map((tab) => (
                <Link
                    key={tab.name}
                    to={tab.path}
                    className={styles.tab}
                >
                    {tab.name}
                </Link>
            ))}
        </nav>
    );
}
