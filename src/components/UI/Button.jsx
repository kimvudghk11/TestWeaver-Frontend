import styles from "./Button.module.css";
import clsx from "clsx";

export default function Button({
    children, variant = "primary", size = "medium", className, ...props }) {

    const btnClass = clsx(styles.button, styles[variant], styles[size], className);

    return (
        <button className={btnClass} {...props}>
            {children}
        </button>
    )
}