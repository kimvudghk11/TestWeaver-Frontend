import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function RestPwPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        loginId: "",
        name: "",
        email: "",
        newPassword: "",
    });

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await authApi.resetPassword(form);

            navigate("/auth/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <AuthLayout title="Reset Password">
            <form className={styles.form} onSubmit={onSubmit}>
                <Input name="loginId" label="User ID" placeholder="your ID" type="text" onChange={onChange} />
                <Input name="name" label="User Name" placeholder="your Name" type="text" onChange={onChange} />
                <Input name="email" label="User Email" placeholder="your Email" type="email" onChange={onChange} />
                <Input name="newPassword" label="New Password" placeholder="your New Password" type="password" onChange={onChange} />

                <Button type="submit">Change Password</Button>
            </form>
        </AuthLayout>
    );
}