import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

import MainLayout from "../../components/Layout/MainLayout";
import Button from "../../components/UI/Button";
import styles from "./Project.module.css";

export default function ProjectListPage() {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await projectApi.list();

                setProjects(res.data);
            } catch (err) {
                console.err(err);
                setErr(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className={styles.dashboard}>
                    <p>Loading projects...</p>
                </div>
            </MainLayout>
        );
    }

    if (err) {
        return (
            <MainLayout>
                <div className={styles.dashboard}>
                    <p>프로젝트 목록을 불러오는 중 오류가 발생했습니다.</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className={styles.dashboard}>

                {/* 헤더 영역 */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <h1 className={styles.title}>My Projects</h1>
                        <p className={styles.subtitle}>A directory of your Dashboard.</p>
                    </div>

                    <Button onClick={() => navigate("/projects/create")}>
                        Create New Test Case
                    </Button>
                </div>

                {/* 프로젝트 리스트 */}
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Project Name</th>
                                <th>Description</th>
                                <th>Last Updated</th>
                            </tr>
                        </thead>

                        <tbody>
                            {projects.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: "center" }}>
                                        아직 생성된 프로젝트가 없습니다.
                                    </td>
                                </tr>
                            ) : (
                                projects.map((p, index) => (
                                    <tr
                                        key={p.id}
                                        className={styles.row}
                                        onClick={() => navigate(`/projects/${p.id}/detail`)}
                                    >
                                        <td>{index + 1}</td>
                                        <td>{p.name}</td>
                                        <td styles={styles.descCell}>{p.description || "-"}</td>
                                        <td>{p.updatedAt.slice(0, 10) || "-"}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
}
