import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

import ProjectLayout from "../../components/Project/ProjectLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./ProjectDetail.module.css";

export default function ProjectDetailPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    /** Parameter States */
    const [params, setParams] = useState([]);
    const [newParam, setNewParam] = useState("");
    const [newValues, setNewValues] = useState("");

    /** Strategy States */
    const [strategy, setStrategy] = useState("IPO");
    const [coverage, setCoverage] = useState("2-way");

    /** Parameter 추가 */
    const addParam = () => {
        if (!newParam || !newValues) return;

        const values = newValues
            .split(",")
            .map((v) => v.trim())
            .filter((v) => v.length > 0);

        setParams([...params, { name: newParam, values }]);
        setNewParam("");
        setNewValues("");
    };

    /** Parameter 삭제 */
    const removeParam = (index) => {
        setParams(params.filter((_, i) => i !== index));
    };

    /** Save/Generate */
    const saveModel = async () => {
        if (params.length === 0)
            return;

        const payload = {
            strategy,
            coverage,
            parameters: params,
        };

        try {
            await projectApi.generateModel(id, payload);

            navigate(`/projects/${id}/testcases`);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <ProjectLayout>
            <div className={styles.container}>

                <h1 className={styles.pageTitle}>Project Detail</h1>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Parameters</h2>

                    <div className={styles.row}>
                        <Input
                            label="파라미터 이름"
                            value={newParam}
                            onChange={(e) => setNewParam(e.target.value)}
                        />
                        <Input
                            label="값 (쉼표로 구분)"
                            value={newValues}
                            onChange={(e) => setNewValues(e.target.value)}
                        />
                        <Button onClick={addParam}>추가</Button>
                    </div>

                    <h2 className={styles.sectionTitle}>Parameters List</h2>

                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Parameter Name</th>
                                    <th>Values</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {params.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} style={{ textAlign: "center", padding: "16px" }}>
                                            아직 설정된 파라미터가 없습니다.
                                        </td>
                                    </tr>
                                ) : (
                                    params.map((p, i) => (
                                        <tr key={i}>
                                            <td>{p.name}</td>
                                            <td>{p.values.join(", ")}</td>
                                            <td>
                                                <Button onClick={() => removeParam(i)}>삭제</Button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2 className={styles.sectionTitle}>Strategy</h2>

                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="strategy"
                                value="IPO"
                                checked={strategy === "IPO"}
                                onChange={(e) => setStrategy(e.target.value)}
                            />
                            IPO
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="strategy"
                                value="IPOG"
                                checked={strategy === "IPOG"}
                                onChange={(e) => setStrategy(e.target.value)}
                            />
                            IPOG
                        </label>
                    </div>

                    <h2 className={styles.sectionTitle}>Coverage</h2>

                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                name="coverage"
                                value="2-way"
                                checked={coverage === "2-way"}
                                onChange={(e) => setCoverage(e.target.value)}
                            />
                            2-way
                        </label>

                        <label>
                            <input
                                type="radio"
                                name="coverage"
                                value="3-way"
                                checked={coverage === "3-way"}
                                onChange={(e) => setCoverage(e.target.value)}
                            />
                            3-way
                        </label>
                    </div>
                </section>

                <section className={styles.buttonSection}>
                    <Button onClick={saveModel}>Save & Generate Test Cases</Button>
                </section>
            </div>
        </ProjectLayout>
    );
}
