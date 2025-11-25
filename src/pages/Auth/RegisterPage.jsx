import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../api/authApi";

import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        loginId: "",
        email: "",
        name: "",
        password: "",
        phone: "",
    });

    const onChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await authApi.register(form);

            navigate("/auth/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <AuthLayout title="Sing up">
            <form className={styles.form} onSubmit={onSubmit}>
                <Input name="loginId" label="User Id" placeholder="EX) testweaver" type="text" onChange={onChange} />
                <Input name="email" label="Email" placeholder="EX) testweaver@testweaver.com" type="email" onChange={onChange} />
                <Input name="name" label="Name" placeholder="EX) kim testweaver" type="text" onChange={onChange} />
                <Input name="password" label="Password" placeholder="EX)testweaver password" type="password" onChange={onChange} />
                <Input name="phone" label="Phone" placeholder="EX) xxx-xxxx-xxxx" type="text" onChange={onChange} />

                <Button type="submit">Sing up</Button>
            </form>
        </AuthLayout>
    );
}