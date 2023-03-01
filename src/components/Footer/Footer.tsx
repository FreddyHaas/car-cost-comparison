import React from "react"
import { BsGithub } from "react-icons/bs"
import style from "@/src/styles/Footer.module.css"

const footer: React.FC = () => (
    <section className={style.footer}>
        <span>2023 | Frederik Haas</span>
        <a
            className={style.Icon}
            href="https://github.com/FreddyHaas/car-cost-comparison"
        >
            <BsGithub />
        </a>
    </section>
)

export default footer
