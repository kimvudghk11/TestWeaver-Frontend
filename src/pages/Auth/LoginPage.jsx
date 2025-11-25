import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [form, setForm] = useState({ loginId: "", password: "" });

    useEffect(() => {
        if (user)
            navigate("/projects");
    }, [user]);

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        const res = await authApi.login(form);
        login(res);
    };

    return (
        <AuthLayout title="Login">
            <form className={styles.form} onSubmit={onSubmit}>
                <Input name="loginId" placeholder="User Id" autoComplete="userId" onChange={onChange} />
                <Input name="password" type="password" placeholder="User Password" autoComplete="current-password" onChange={onChange} />

                <Button type="submit">Sing in</Button>

                <div className={styles.subActions}>
                    <a href="/auth/reset-password">Forgot Password?</a>
                    <a href="/auth/register">Don't have an account? Register</a>
                </div>
            </form>
        </AuthLayout>
    );
}