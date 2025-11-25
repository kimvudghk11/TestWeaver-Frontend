import { NavLink, useParams } from "react-router-dom";
import styles from "./ProjectLayout.module.css";

export default function ProjectTabs() {
    const { id } = useParams();

    const tabs = [
        { name: "Project List", path: "/projects" },
        { name: "Overview", path: `/projects/${id}/detail` },
        { name: "TestCases", path: `/projects/${id}/testcases` },
        { name: "Export", path: `/projects/${id}/export` },
    ];

    return (
        <nav className={styles.tabs}>
            {tabs.map((tab) => (
                <NavLink
                    key={tab.name}
                    to={tab.path}
                    className={styles.tab}
                >
                    {tab.name}
                </NavLink>
            ))}
        </nav>
    );
}
