import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../../api/projectApi";
import { testcaseApi } from "../../api/testcaseApi";

import TestCasesLayout from "../../components/Layout/TestCasesLayout";
import styles from "./TestCaseList.module.css";

export default function TestCaseListPage() {
    const { id } = useParams();
    const [sets, setSets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [format, setFormat] = useState("csv");

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

    const handleExport = async () => {
        try {
            const res = await testcaseApi.export(id, format);

            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `testcases_${id}.${format === "excel" ? "xlsx" : format}`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    if (loading) return <TestCasesLayout>Loading...</TestCasesLayout>;

    if (sets.length === 0) {
        return (
            <TestCasesLayout>
                <h1>Generated Test Cases</h1>
                <p>아직 생성된 테스트 케이스가 없습니다.</p>
            </TestCasesLayout>
        );
    }

    const firstSet = sets[0];
    const cases = firstSet.testCases || [];

    return (
        <TestCasesLayout>
            <h1 className={styles.title}>Generated Test Cases</h1>

            {/* Export 영역 */}
            <div className={styles.exportSection}>
                <select
                    className={styles.select}
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                >
                    <option value="csv">CSV</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="gherkin">Gherkin</option>
                </select>

                <button className={styles.exportBtn} onClick={handleExport}>
                    다운로드
                </button>
            </div>

            {/* 테이블 */}
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>No</th>
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
        </TestCasesLayout>
    );
}
