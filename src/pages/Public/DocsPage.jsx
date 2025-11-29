import PublicLayout from "../../components/Layout/Public/PublicLayout";
import styles from "./Docs.module.css";

export default function DocsPage() {
    return (
        <PublicLayout>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1 className={styles.title}>How to use TestWeaver</h1>
                    <p className={styles.subtitle}>
                        복잡한 테스트 조합을 최소한의 케이스로 최적화하세요.<br />
                        TestWeaver는 <strong>Pairwise (All-pairs) 테스트 기법</strong>을 기반으로
                        가장 효율적인 테스트 시나리오를 생성해줍니다.
                    </p>
                </header>

                <hr className={styles.divider} />

                <div className={styles.contentRow}>
                    <section className={styles.workflowSection}>
                        <h2 className={styles.sectionTitle}>Workflow</h2>

                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>01</div>
                            <div className={styles.stepContent}>
                                <h3>Define Parameters (모델 정의)</h3>
                                <p>
                                    테스트하려는 환경 변수와 값을 입력합니다.<br />
                                    <span className={styles.exampleText}>예) OS: [Windows, Mac, Linux], Browser: [Chrome, Safari]</span>
                                </p>
                            </div>
                        </div>

                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>02</div>
                            <div className={styles.stepContent}>
                                <h3>Configure Strategy (전략 설정)</h3>
                                <p>
                                    알고리즘과 커버리지 강도를 선택합니다.
                                </p>
                                <ul className={styles.featureList}>
                                    <li><strong>Algorithm:</strong> IPO (빠름), IPOG (정밀함)</li>
                                    <li><strong>Coverage:</strong> 2-way (일반적), 3-way (높은 강도)</li>
                                </ul>
                            </div>
                        </div>

                        <div className={styles.stepCard}>
                            <div className={styles.stepNumber}>03</div>
                            <div className={styles.stepContent}>
                                <h3>Generate & Export (생성 및 내보내기)</h3>
                                <p>
                                    생성된 최적의 테스트 케이스를 확인하고 원하는 포맷으로 다운로드하세요.
                                </p>
                                <div className={styles.tagContainer}>
                                    <span className={styles.tag}>CSV</span>
                                    <span className={styles.tag}>Excel</span>
                                    <span className={styles.tag}>Gherkin</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className={styles.infoSection}>
                        <h2 className={styles.sectionTitle}>Why TestWeaver?</h2>
                        <div className={styles.grid}>
                            <div className={styles.infoCard}>
                                <h4>⚡ 시간 절약</h4>
                                <p>수백 개의 가능한 조합 중, 결함 발견 확률이 가장 높은 핵심 조합만 추출하여 테스트 시간을 획기적으로 줄입니다.</p>
                            </div>
                            <div className={styles.infoCard}>
                                <h4>🔍 높은 커버리지</h4>
                                <p>2-way(Pairwise) 커버리지를 통해, 대부분의 소프트웨어 결함이 발생하는 '두 변수 간의 상호작용'을 놓치지 않습니다.</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </PublicLayout>
    );
}