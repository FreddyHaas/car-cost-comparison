import Link from "next/link"
import React from "react"
import navStyle from "@/styles/Nav.module.css"
import { FaCar } from "react-icons/fa"
import useSearch from "@/hooks/useSearch"
import { useRouter } from "next/router"

function Nav() {
    const router = useRouter()
    const { setSearchByModel } = useSearch()

    const goToModelSearch = () => {
        setSearchByModel(true)
        router.push("/")
    }

    const goToCheapSearch = () => {
        setSearchByModel(false)
        router.push("/")
    }

    return (
        <section className={navStyle.nav}>
            <Link href="/" className={navStyle.logo}>
                <FaCar />
                <span>CarCosts.de</span>
            </Link>
            <ul className={navStyle.menu}>
                <li>
                    <button type="button" onClick={goToModelSearch}>
                        Auto suchen
                    </button>
                </li>
                <li>
                    <button type="button" onClick={goToCheapSearch}>
                        Günstige Autos finden
                    </button>
                </li>
            </ul>
        </section>
    )
}

export default Nav
