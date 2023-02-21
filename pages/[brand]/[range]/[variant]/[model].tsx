import React from "react"
import {
    GetStaticPaths,
    GetStaticProps,
    InferGetServerSidePropsType,
} from "next"
import db from "@/FirebaseConnection/firebase-admin"
import ModelPage from "@/components/Results/ModelPage/ModelPage"

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
                if (rangeModelList !== undefined) {
                    rangeModelList[variant].forEach((model: string) => {
                        paths.push({
                            params: {
                                brand,
                                range: rangeSlug,
                                variant,
                                model,
                            },
                        })
                    })
                }
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
    const model = context.params ? context.params.model : undefined

    if (typeof range === "string") {
        range = range.replaceAll("_", "/") // Reversal of replacement of slashes with underscore in creation of URL
    }

    const docRef = db.collection("models")
    const brandListDocs = docRef.where("modelInformation.brand", "==", brand)
    const rangeListDocs = brandListDocs.where(
        "modelInformation.range",
        "==",
        range
    )
    const variantListDocs = rangeListDocs.where(
        "modelInformation.variant",
        "==",
        variant
    )
    const modelListDocs = await variantListDocs
        .where("modelInformation.modelNameShort", "==", model)
        .get()

    const modelData: object[] = []

    modelListDocs.forEach((listItem) => {
        modelData.push(listItem.data())
    })

    return {
        props: { modelData, brand },
    }
}

export default function modelPages({
    modelData,
    brand,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
    return <ModelPage modelData={modelData} brand={brand} />
}
