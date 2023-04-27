import Link from "next/link";
import styles from "./Footer.module.scss";

export function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.wrappers}>
                <Link
                    href={"/mentions-legales"}
                >
                    Mentions légales
                </Link>
                <Link href={"/CGU"}>
                    CGU
                </Link>
                <Link href={"/politiques-cookies"}>
                    Politique des cookies
                </Link>
            </div>
            <div className={styles.wrappers}>
                <Link href={"/politique-confidentialite"}>
                    Politique de confidentialité
                </Link>
                <Link href={"/reglement-jeu"}>
                    Réglement du jeu
                </Link>
                <Link href={"/FAQ"} target="_blank">
                    FAQ
                </Link>
            </div>

        </div>
    )
}
