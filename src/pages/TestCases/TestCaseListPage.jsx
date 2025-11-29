import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { projectApi } from "../../api/projectApi";
import { testcaseApi } from "../../api/testcaseApi";

import TestCasesLayout from "../../components/Layout/TestCases/TestCasesLayout";
import styles from "./TestCaseList.module.css";

export default function TestCaseListPage() {
    const { id: projectId } = useParams();
    const [sets, setSets] = useState([]);
    const [selectedSetId, setSelectedSetId] = useState(null);
    const [selectedCases, setSelectedCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [format, setFormat] = useState("csv");

    useEffect(() => {
        loadSets();
    }, []);

    const loadSets = async () => {
        try {
            const res = await projectApi.getTestCases(projectId);
            setSets(res.data || []);
        } catch (err) {
            console.error(err);
            setSets([]);
        } finally {
            setLoading(false);
        }
    };

    const loadSetDetail = async (setId) => {
        try {
            const res = await testcaseApi.getSet(setId);

            if (!res?.data?.testCases) {
                setSelectedCases([]);
                return;
            }

            setSelectedCases(res.data.testCases);
        } catch (err) {
            console.error(err);
            setSelectedCases([]);
        }
    };

    const handleSelectSet = (setId) => {
        setSelectedSetId(setId);
        loadSetDetail(setId);
    };

    const handleExport = async () => {
        if (!selectedSetId) return;

        try {
            const res = await testcaseApi.export(selectedSetId, format);
            const blob = new Blob([res.data]);
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `testcases_${selectedSetId}.${format === "excel" ? "xlsx" : format}`;
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Export failed", err);
        }
    };

    if (loading) return <TestCasesLayout>Loading...</TestCasesLayout>;

    return (
        <TestCasesLayout>
            <h1 className={styles.title}>Generated Test Case Sets</h1>

            {/* SET 목록 테이블 */}
            <div className={styles.listTable}>
                <table>
                    <thead>
                        <tr>
                            <th>Select</th>
                            <th>No</th>
                            <th>Set Name</th>
                            <th>Strategy</th>
                            <th>Coverage</th>
                            <th>Params</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sets.map((s, index) => (
                            <tr key={s.id}>
                                <td>
                                    <input
                                        type="radio"
                                        name="setSelect"
                                        checked={selectedSetId === s.id}
                                        onChange={() => handleSelectSet(s.id)}
                                    />
                                </td>
                                <td>{index + 1}</td>
                                <td>{s.name}</td>
                                <td>{s.strategy}</td>
                                <td>{s.coverage}</td>
                                <td>{s.parameterCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* 선택한 SET의 테스트 케이스 테이블 */}
            {selectedSetId && selectedCases.length > 0 && (
                <>
                    <h2 className={styles.subTitle}>Test Cases for Set #{selectedSetId}</h2>

                    <div className={styles.listTable}>
                        <table>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    {Object.keys(selectedCases[0].values).map((key) => (
                                        <th key={key}>{key}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedCases.map((c, idx) => (
                                    <tr key={idx}>
                                        <td>{idx + 1}</td>
                                        {Object.values(c.values).map((v, i) => (
                                            <td key={i}>{v}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {/* 오른쪽 하단 Fixed Export */}
            <div className={styles.floatingExport}>
                <select
                    className={styles.select}
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                >
                    <option value="csv">CSV</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="gherkin">Gherkin</option>
                </select>

                <button
                    className={styles.exportBtn}
                    disabled={!selectedSetId}
                    onClick={handleExport}
                >
                    Export
                </button>
            </div>
        </TestCasesLayout>
    );
}
