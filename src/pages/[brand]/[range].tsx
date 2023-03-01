import React from "react"
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
} from "next"
import db from "@/src/firebase-admin"
import RangePage from "@/src/components/Results/RangeVariantPage/RangeVariantPage"

export const getStaticPaths: GetStaticPaths = async () => {
    const brandRangeListRef = db
        .collection("dropdownLists")
        .doc("BrandRangeList")
    const docBrandRangeList = await brandRangeListRef.get()
    const brandRangeList = docBrandRangeList.data()
    const brands = brandRangeList ? Object.keys(brandRangeList) : []

    const paths: Array<{
        params: {
            [key: string]: string
        }
    }> = []

    brands.forEach((brand) => {
        if (brandRangeList !== undefined) {
            brandRangeList[brand].forEach((range: string) => {
                const rangeSlug = range.replaceAll("/", "_") // Avoid errors due to slashes in URL
                paths.push({
                    params: { brand, range: rangeSlug },
                })
            })
        }
        return undefined
    })

    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const brand = context.params ? context.params.brand : undefined
    let range = context.params ? context.params.range : undefined

    if (typeof range === "string") {
        range = range.replaceAll("_", "/") // Reversal of replacement of slashes with underscore in creation of URL
    }

    const docRef = db.collection("variants")
    const rangeListDocs = docRef.where("name.brand", "==", brand)
    const variantListDocs = await rangeListDocs
        .where("name.range", "==", range)
        .get()

    const variantList: object[] = []

    variantListDocs.forEach((variant) => {
        variantList.push(variant.data())
    })

    return {
        props: { variantList, brand, range },
    }
}

export default function rangePages({
    variantList,
    brand,
    range,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (
        <RangePage
            variantList={variantList}
            brand={brand}
            range={range}
            variantPage={false}
        />
    )
}
