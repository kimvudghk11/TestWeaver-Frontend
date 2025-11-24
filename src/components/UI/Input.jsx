import styles from "./Input.module.css";

export default function Input({ label, ...props }) {
    return (
        <div className={styles.group}>
            <label>{label}</label>
            <input {...props} />
        </div>
    );
}