import { useState } from "react";
import { authApi } from "../../api/authApi";

import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function LoginPage() {
    const [form, setForm] = useState({ loginId: "", password: "" });

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        authApi.login(form);

        alert("로그인 성공");
        window.location.href = "/";
    };

    return (
        <AuthLayout title="Login">
            <form className={styles.form} onSubmit={onSubmit}>
                <Input placeholder="User Id" onChange={onChange} />
                <Input type="password" placeholder="User Password" onChange={onChange} />

                <Button type="submit">Sing in</Button>

                <div className={styles.subActions}>
                    <a href="/auth/reset-password">Forgot Password?</a>
                    <a href="/auth/register">Don't have an account? Register</a>
                </div>
            </form>
        </AuthLayout>
    );
}