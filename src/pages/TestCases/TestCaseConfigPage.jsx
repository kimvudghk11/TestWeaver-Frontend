import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projectApi } from "../../api/projectApi";
import { generateFakerValues } from "../../utils/fakerGenerator";

import TestCasesLayout from "../../components/Layout/TestCases/TestCasesLayout";
import Button from "../../components/UI/Button";
import styles from "./TestCaseConfig.module.css";

export default function TestCaseConfigPage() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [project, setProject] = useState(null);
    const [apiList, setApiList] = useState([]);
    const [loading, setLoading] = useState(true);

    const [expandedApiIndex, setExpandedApiIndex] = useState(null);
    const [strategy, setStrategy] = useState("IPO");
    const [coverage, setCoverage] = useState("2-way");

    const [currentParams, setCurrentParams] = useState({});

    useEffect(() => {
        const loadData = async () => {
            try {
                const projData = await projectApi.get(id);
                setProject(projData);

                if (projData.swaggerURL) {
                    const swaggerData = await projectApi.analyzeSwagger(projData.swaggerURL);
                    setApiList(swaggerData.endpoints);
                }
            } catch (err) {
                console.error("Failed to load project or swagger", err);
                alert("데이터 로딩 실패. Swagger URL을 확인해주세요.");
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    const toggleApi = (index) => {
        if (expandedApiIndex === index) {
            setExpandedApiIndex(null);
            setCurrentParams({});
        } else {
            setExpandedApiIndex(index);
            const api = apiList[index];
            const initialParams = {};

            api.parameters.forEach(p => {
                const fakeValues = generateFakerValues(p.type, p.format, 3);
                initialParams[p.name] = fakeValues.join(", ");
            });

            setCurrentParams(initialParams);
        }
    };

    const handleParamChange = (name, value) => {
        setCurrentParams(prev => ({ ...prev, [name]: value }));
    };

    const handleGenerate = async () => {
        if (expandedApiIndex === null) return;

        const targetApi = apiList[expandedApiIndex];

        const formattedParams = Object.entries(currentParams).map(([name, valueStr]) => ({
            name,
            values: valueStr.split(",").map(v => v.trim()).filter(v => v.length > 0)
        })).filter(p => p.values.length > 0);

        if (formattedParams.length === 0) {
            alert("테스트할 파라미터가 없습니다.");
            return;
        }

        const payload = {
            name: `[${targetApi.method}] ${targetApi.path} Test`,
            strategy,
            coverage,
            parameters: formattedParams,
        };

        try {
            await projectApi.generateModel(id, payload);
            navigate(`/projects/${id}/testcases`);
        } catch (err) {
            console.error(err);
            alert("테스트 케이스 생성 실패");
        }
    };

    if (loading) return <div>Loading Swagger Spec...</div>;

    return (
        <TestCasesLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.pageTitle}>API Specification</h1>
                    <p className={styles.subTitle}>
                        Select an endpoint to generate pairwise test cases.
                    </p>
                    <div className={styles.urlBadge}>
                        Swagger URL: {project?.swaggerURL || "Not Configured"}
                    </div>
                </div>

                {/* API 목록 (Accordion) */}
                <div className={styles.apiList}>
                    {apiList.map((api, index) => (
                        <div key={index} className={`${styles.apiItem} ${expandedApiIndex === index ? styles.active : ''}`}>

                            {/* Header: Method + Path */}
                            <div className={styles.apiHeader} onClick={() => toggleApi(index)}>
                                <span className={`${styles.method} ${styles[api.method]}`}>
                                    {api.method}
                                </span>
                                <span className={styles.path}>{api.path}</span>
                                <span className={styles.summary}>{api.summary}</span>
                            </div>

                            {/* Body: Parameters (열렸을 때만 보임) */}
                            {expandedApiIndex === index && (
                                <div className={styles.apiBody}>
                                    <h3>Parameters (Auto-filled by Faker)</h3>

                                    <div className={styles.paramTable}>
                                        {api.parameters.map((param) => (
                                            <div key={param.name} className={styles.paramRow}>
                                                <div className={styles.paramInfo}>
                                                    <span className={styles.paramName}>{param.name}</span>
                                                    <span className={styles.paramType}>
                                                        {param.in} / {param.type} {param.required && '*'}
                                                    </span>
                                                </div>
                                                <div className={styles.paramInput}>
                                                    <input
                                                        type="text"
                                                        value={currentParams[param.name] || ""}
                                                        onChange={(e) => handleParamChange(param.name, e.target.value)}
                                                    />
                                                    <small>Separate values with comma (,)</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* 전략 설정 */}
                                    <div className={styles.strategySection}>
                                        <div className={styles.option}>
                                            <label>Strategy:</label>
                                            <select value={strategy} onChange={(e) => setStrategy(e.target.value)}>
                                                <option value="IPO">IPO (Pairwise)</option>
                                                <option value="IPOG">IPOG</option>
                                            </select>
                                        </div>
                                        <div className={styles.option}>
                                            <label>Coverage:</label>
                                            <select value={coverage} onChange={(e) => setCoverage(e.target.value)}>
                                                <option value="2-way">2-way</option>
                                                <option value="3-way">3-way</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* 실행 버튼 */}
                                    <div className={styles.actionArea}>
                                        <Button onClick={handleGenerate}>
                                            Try it out (Generate Test Cases)
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </TestCasesLayout>
    );
}