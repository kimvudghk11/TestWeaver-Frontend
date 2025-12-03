import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

import MainLayout from "../../components/Layout/Main/MainLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import CircleVerticalBar from "../../components/UI/CircleVerticalBar";
import styles from "./ProjectCreate.module.css";

export default function ProjectCreatePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
        swaggerUrl: "", // state 추가 확인
    });

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!form.name.trim()) return;

        try {
            const res = await projectApi.create(form);
            navigate(`/projects/#${res.id}/overview`);
        } catch (err) {
            console.error(err);
            alert("프로젝트 생성 중 오류가 발생했습니다.");
        }
    };

    return (
        <MainLayout>
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Project</h1>
                    <p className={styles.subtitle}>Start your automation with Swagger</p>
                </div>

                <div className={styles.inputWrapper}>
                    {/* 높이를 280 -> 350 정도로 넉넉하게 늘려보세요 */}
                    <CircleVerticalBar text="" color="#393E46" barHeight={350} />

                    <div className={styles.general}>
                        <div className={styles.inputTitle}>General</div>

                        <Input
                            name="name"
                            label="Project Name *"
                            placeholder="Input your project Name"
                            onChange={onChange}
                        />

                        <Input
                            name="description"
                            label="Description"
                            placeholder="Input your project description"
                            onChange={onChange}
                        />

                        {/* 이 부분이 화면에 나와야 정상입니다 */}
                        <div style={{ marginTop: "24px" }}>
                            <Input
                                name="swaggerUrl"
                                label="Swagger URL (Optional)"
                                placeholder="e.g. https://petstore.swagger.io/v2/swagger.json"
                                onChange={onChange}
                            />
                            <p style={{ fontSize: "12px", color: "#888", marginTop: "8px" }}>
                                * Swagger URL을 입력하면 API를 자동으로 분석해드립니다.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button type="submit">Create Project</Button>
                </div>
            </form>
        </MainLayout >
    );
}