import MainLayout from "../../components/Layout/MainLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import CircleVerticalBar from "../../components/UI/CircleVerticalBar";
import styles from "./ProjectCreate.module.css";

export default function ProjectCreatePage() {
    return (
        <MainLayout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Test Case</h1>
                    <p className={styles.subtitle}>Select your new project</p>
                </div>

                <div className={styles.inputWrapper}>
                    <CircleVerticalBar text="1" color="#393E46" barHeight={220} />

                    <div className={styles.general}>
                        <div className={styles.inputTitle}>General</div>

                        <Input label="Project Name *" placeholder="input your project Name" />
                        <Input label="Description" placeholder="input your project description" />
                    </div>
                </div>

                <div className={styles.inputWrapper}>
                    <CircleVerticalBar text="2" color="#393E46" barHeight={250} />

                    <div className={styles.general}>
                        <div className={styles.inputTitle}>Configuration</div>

                        {/* Strategy */}
                        <div className={styles.radioGroupWrapper}>
                            <div className={styles.radioTitle}>Strategy</div>

                            <div className={styles.radioGroup}>
                                <label>
                                    <input type="radio" name="strategy" value="IPO" defaultChecked />
                                    IPO
                                </label>
                                <label>
                                    <input type="radio" name="strategy" value="IPOG" />
                                    IPOG
                                </label>
                            </div>
                        </div>

                        {/* Test Coverage */}
                        <div className={styles.radioGroupWrapper}>
                            <div className={styles.radioTitle}>Test Coverage</div>

                            <div className={styles.radioGroup}>
                                <label>
                                    <input type="radio" name="coverage" value="2-way" defaultChecked />
                                    2-way
                                </label>
                                <label>
                                    <input type="radio" name="coverage" value="3-way" />
                                    3-way
                                </label>
                            </div>
                        </div>

                        <Button type="submit">Create Test Case</Button>
                    </div>
                </div>
            </div>
        </MainLayout >
    );
}