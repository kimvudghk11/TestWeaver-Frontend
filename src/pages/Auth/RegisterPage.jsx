import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function RegisterPage() {
    return (
        <AuthLayout title="Sing up">
            <form className={styles.form}>
                <Input label="User Id" type="text" />
                <Input label="Email" type="email" />
                <Input label="name" type="text" />
                <Input label="Password" type="password" />
                <Input label="Phone" type="text" />
                <Button type="submit">Sing up</Button>
            </form>
        </AuthLayout>
    );
}