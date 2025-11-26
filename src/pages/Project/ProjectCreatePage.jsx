import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { projectApi } from "../../api/projectApi";

import MainLayout from "../../components/Layout/MainLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import CircleVerticalBar from "../../components/UI/CircleVerticalBar";
import styles from "./ProjectCreate.module.css";

export default function ProjectCreatePage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        description: "",
    });

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!form.name.trim())
            return;

        try {
            const res = await projectApi.create(form);

            navigate(`/projects/#${res.id}/overview`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <MainLayout>
            <form className={styles.container} onSubmit={onSubmit}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Create New Test Case</h1>
                    <p className={styles.subtitle}>Select your new project</p>
                </div>

                <div className={styles.inputWrapper}>
                    <CircleVerticalBar text="" color="#393E46" barHeight={200} />

                    <div className={styles.general}>
                        <div className={styles.inputTitle}>General</div>

                        <Input name="name" label="Project Name *" placeholder="input your project Name" onChange={onChange} />
                        <Input name="description" label="Description" placeholder="input your project description" onChange={onChange} />
                    </div>
                </div>

                <div className={styles.buttonWrapper}>
                    <Button type="submit">Create Test Case</Button>
                </div>
            </form>
        </MainLayout >
    );
}