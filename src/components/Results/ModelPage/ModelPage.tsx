import React from "react"
import style from "@/src/styles/Results.module.css"
import SearchFormContainer from "@/src/components/SearchForm/SearchFormContainer"
import TypeList from "./TypeList"

interface Props {
    brand: string
    modelData: Array<{ [key: string]: any }>
}

function ModelPage({ brand, modelData }: Props) {
    const powerInHP: number[] = []
    let powerInformation: string
    let powerDifferences = false

    modelData[0].types.forEach((type: any) => {
        powerInHP.push(type.powerInHP)
    })

    const minPower = Math.min(...powerInHP)
    const maxPower = Math.max(...powerInHP)

    if (minPower === maxPower) {
        powerInformation = `${minPower} PS`
    } else {
        powerInformation = `${minPower} - ${maxPower} PS`
        powerDifferences = true
    }

    let { motorType } = modelData[0].modelInformation

    if (motorType === "Otto") {
        motorType = "Benziner"
    } else if (motorType === "Otto (Mild-Hybrid)") {
        motorType = "Benziner (Mild-Hybrid)"
    }

    return (
        <section className={style.pageContainer}>
            <SearchFormContainer smallView />
            <div className={style.resultsDisplay}>
                <h1 className={style.header}>
                    {brand} {modelData[0].modelInformation.modelName}
                </h1>
                <h2 className={style.subHeader}>
                    {modelData[0].modelInformation.bodyType} | {motorType} |{" "}
                    <span className={style.block}>{powerInformation}</span>
                </h2>
                <h2 className={style.tableHeader}>Kostenübersicht</h2>
                <TypeList
                    typeList={modelData[0].types}
                    powerDifferences={powerDifferences}
                />
            </div>
        </section>
    )
}
export default ModelPage
