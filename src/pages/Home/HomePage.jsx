import PublicLayout from "../../components/Layout/PublicLayout";
import styles from "./Home.module.css";

export default function HomePage() {
    return (
        <PublicLayout>
            <div className={styles.container}>
                <h1>TestWeaver</h1>
                <p>Powerful Pairwise / IPO / IPOG Test Case Generator</p>
                <button className={styles.startBtn}>Get Started</button>
            </div>
        </PublicLayout>
    );
}