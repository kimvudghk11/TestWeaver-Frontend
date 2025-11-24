import { useState } from "react";
import { authApi } from "../../api/authApi";
import Input from "../../components/UI/Input";
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
        <div className={styles.container}>
            <form className={styles.form} onSubmit={onSubmit}>
                <h2>로그인</h2>

                <Input label="아이디" name="loginId" onChange={onChange} />
                <Input label="비밀번호" name="password" type="password" onChange={onChange} />

                <button className={styles.btn}>로그인</button>

                <div className={styles.links}>
                    <a href="/auth/find-id">아이디 찾기</a>
                    <a href="/auth/reset-pw">비밀번호 찾기</a>
                </div>
            </form>
        </div>
    );
}