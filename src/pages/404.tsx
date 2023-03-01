import React from "react"
import style from "@/src/styles/ErrorPage.module.css"

function ErrorPage(): JSX.Element {
    return (
        <section className={style.pageContainer}>
            <p className={style.notFoundPage}>
                Sorry, diese Seite konnte leider nicht gefunden werden...
            </p>
        </section>
    )
}
export default ErrorPage
