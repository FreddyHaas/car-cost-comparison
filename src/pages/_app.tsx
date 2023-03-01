import React from "react"
import Layout from "@/src/components/Overarching/Layout"
import "@/src/styles/Globals.css"
import type { AppProps } from "next/app"
import SearchProvider from "@/src/context/provider"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SearchProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SearchProvider>
    )
}
