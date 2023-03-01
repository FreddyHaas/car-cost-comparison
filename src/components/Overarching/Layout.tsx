import React from "react"
import Nav from "../Navbar/Nav"
import Footer from "../Footer/Footer"

interface Props {
    children: React.ReactNode
}

function Layout({ children }: Props) {
    return (
        <>
            <Nav />
            {children}
            <Footer />
        </>
    )
}

export default Layout
