import styles from "@/styles/Header.module.css"
import { FaCheckCircle } from "react-icons/fa"
import React from "react"

function HeroHeader() {
    return (
        <div className={styles.header}>
            <h1>Autokosten vergleichen und günstiger Fahren</h1>
            <p>
                Was kostet mein Auto im Monat? Wie kann ich beim nächsten
                Autokauf Geld sparen? Finde es heraus:
            </p>
            <ul className={styles.benefits}>
                <li>
                    <FaCheckCircle />
                    <span>
                        <b>Über 5.500 aktuelle Modelle</b> im Kostenvergleich
                    </span>
                </li>
                <li>
                    <FaCheckCircle />
                    <span>
                        <b>Alle Kosten auf einen Blick</b> - Sprit,
                        Versicherung, etc.
                    </span>
                </li>
                <li>
                    <FaCheckCircle />
                    <span>
                        <b>Individuelle Berechnung</b> je nach Fahrweise
                    </span>
                </li>
            </ul>
        </div>
    )
}

export default HeroHeader
