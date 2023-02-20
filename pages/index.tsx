import React from "react"
import HeroHeader from "@/components/Header/HeroHeader"
import SearchFormContainer from "@/components/SearchForm/SearchFormContainer"
import style from "@/styles/Home.module.css"

export default function Home(): JSX.Element {
    return (
        <section className={style.pageContainer}>
            <HeroHeader />
            <SearchFormContainer smallView={false} />
        </section>
    )
}
