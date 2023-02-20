import React from "react"
import Layout from "@/components/Overarching/Layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"
import SearchProvider from "@/context/provider"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <SearchProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </SearchProvider>
    )
}
