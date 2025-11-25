import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../../api/projectApi";
import ProjectLayout from "../../components/Project/ProjectLayout";
import styles from "./TestCases.module.css";

export default function TestCasesPage() {
    const { id } = useParams();
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        load();
    }, []);

    const load = async () => {
        try {
            const res = await projectApi.getTestCases(id);

            setSets(res.data || []);
        } catch (err) {
            console.error(err);
            setSets([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <ProjectLayout>Loading...</ProjectLayout>;

    if (sets.length === 0) {
        return (
            <ProjectLayout>
                <h1>Generated Test Cases</h1>
                <p>아직 생성된 테스트 케이스가 없습니다.</p>
            </ProjectLayout>
        );
    }

    const firstSet = sets[0];
    const cases = firstSet.testCases || [];

    return (
        <ProjectLayout>
            <h1>Generated Test Cases</h1>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>#</th>
                        {cases.length > 0 &&
                            Object.keys(cases[0]).map((key) => (
                                <th key={key}>{key}</th>
                            ))}
                    </tr>
                </thead>

                <tbody>
                    {cases.map((c, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {Object.values(c).map((v, i) => (
                                <td key={i}>{v}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </ProjectLayout>
    );
}
