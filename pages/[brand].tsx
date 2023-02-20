import React from "react"
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
} from "next"
import BrandPage from "@/components/Results/BrandPage/BrandPage"
import db from "../FirebaseConnection/firebase-admin"

export const getStaticPaths: GetStaticPaths = async () => {
    const brandRangeListRef = db
        .collection("dropdownLists")
        .doc("BrandRangeList")
    const docBrandRangeList = await brandRangeListRef.get()
    const brandRangeList = docBrandRangeList.data()
    const brands = brandRangeList ? Object.keys(brandRangeList) : []

    const paths = brands.map((brand) => ({
        params: { brand },
    }))

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const brand = context.params?.brand

    const docRef = db.collection("variants")
    const variantListDocs = await docRef.where("name.brand", "==", brand).get()

    const variantList: object[] = []

    variantListDocs.forEach((variant) => {
        variantList.push(variant.data())
    })

    return {
        props: { variantList, brand },
    }
}

export default function brandPages({
    variantList,
    brand,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return <BrandPage variantList={variantList} brand={brand} />
}
