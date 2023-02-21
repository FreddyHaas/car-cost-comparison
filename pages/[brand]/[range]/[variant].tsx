import React from "react"
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
} from "next"
import db from "@/FirebaseConnection/firebase-admin"
import VariantPage from "@/components/Results/RangeVariantPage/RangeVariantPage"

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

    const noOfBrands = brands.length

    async function loadDataPerBrand(brand: string) {
        const promises: Promise<FirebaseFirestore.DocumentSnapshot>[] = []
        const ranges: string[] = []

        if (brandRangeList !== undefined) {
            brandRangeList[brand].forEach((rangeName: string) => {
                ranges.push(rangeName)
                const carName = encodeURIComponent(`${brand} ${rangeName}`)
                const rangeModelListRef = db
                    .collection("dropdownLists")
                    .doc(carName)
                promises.push(rangeModelListRef.get())
            })
        }
        const data = await Promise.all(promises)

        data.forEach((dataDoc, index) => {
            const rangeModelList = dataDoc.data()
            const range = ranges[index]
            const variants = rangeModelList ? Object.keys(rangeModelList) : []

            const rangeSlug = range.replaceAll("/", "_") // Avoid errors due to slashes in URL

            variants.forEach((variant) => {
                paths.push({
                    params: {
                        brand,
                        range: rangeSlug,
                        variant,
                    },
                })
            })
        })
    }

    for (let j = 0; j < noOfBrands; j += 1) {
        const brand = brands[j]
        // eslint-disable-next-line no-await-in-loop
        await loadDataPerBrand(brand)
    }

    return {
        paths,
        fallback: false,
    }
}
export const getStaticProps: GetStaticProps = async (context) => {
    const brand = context.params ? context.params.brand : undefined
    let range = context.params ? context.params.range : undefined
    const variant = context.params ? context.params.variant : undefined

    if (typeof range === "string") {
        range = range.replaceAll("_", "/") // Reversal of replacement of slashes with underscore in creation of URL
    }

    const docRef = db.collection("variants")
    const brandListDocs = docRef.where("name.brand", "==", brand)
    const rangeListDocs = brandListDocs.where("name.range", "==", range)
    const variantListDocs = await rangeListDocs
        .where("name.variant", "==", variant)
        .get()

    const variantList: object[] = []

    variantListDocs.forEach((listItem) => {
        variantList.push(listItem.data())
    })

    return {
        props: { variantList, brand, range },
    }
}

export default function variantPages({
    variantList,
    brand,
    range,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return (
        <VariantPage
            variantList={variantList}
            brand={brand}
            range={range}
            variantPage
        />
    )
}
