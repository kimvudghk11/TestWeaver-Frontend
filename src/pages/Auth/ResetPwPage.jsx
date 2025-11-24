import AuthLayout from "../../components/Layout/AuthLayout";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import styles from "./Auth.module.css";

export default function RestPwPage() {
    return (
        <AuthLayout title="Reset Password">
            <form className={styles.form}>
                <Input label="User Name" type="text" />
                <Input label="User Email" type="email" />
                <Button type="submit">Change Password</Button>
            </form>
        </AuthLayout>
    );
}