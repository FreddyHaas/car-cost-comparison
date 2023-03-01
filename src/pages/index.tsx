import React from "react"
import HeroHeader from "@/src/components/Header/HeroHeader"
import SearchFormContainer from "@/src/components/SearchForm/SearchFormContainer"
import style from "@/src/styles/Home.module.css"

export default function Home(): JSX.Element {
    return (
        <section className={style.pageContainer}>
            <HeroHeader />
            <SearchFormContainer smallView={false} />
        </section>
    )
}
