/* eslint-disable @next/next/no-img-element */
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import React, { useState } from "react"
import { MdOutlineArrowBackIosNew } from "react-icons/md"
import style from "@/src/styles/Results.module.css"
import ModelDisplay from "./ModelDisplay"

interface Props {
    variant: { [key: string]: any }
    bodyTypeHeader: Boolean
    bodyTypeName: String
}

function VariantDisplay({ variant, bodyTypeHeader, bodyTypeName }: Props) {
    // Fold and unfold display of models
    const [displayModels, setDisplayModels] = useState(true)

    let header: JSX.Element | null = null

    if (bodyTypeHeader) {
        header = (
            <div className={style.bodyTyp}>
                <img
                    src={`/${bodyTypeName}.jpg`}
                    className={style.bodyImg}
                    alt={`${bodyTypeName}`}
                />
                <div className={style.bodyTypeName}>{bodyTypeName}</div>
            </div>
        )
    }

    const toggleDisplay = () => {
        setDisplayModels(!displayModels)
    }

    return (
        <>
            {header}
            <table className={style.table}>
                <caption>
                    {variant.name.variant}
                    <MdOutlineArrowBackIosNew
                        className={
                            displayModels
                                ? style.arrowIconUp
                                : style.arrowIconDown
                        }
                        onClick={toggleDisplay}
                    />
                </caption>
                <ModelDisplay variant={variant} displayNone={displayModels} />
            </table>
        </>
    )
}

export default VariantDisplay
