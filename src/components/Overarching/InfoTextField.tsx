/* eslint-disable react/require-default-props */
import React from "react"
import style from "@/src/styles/InfoTextField.module.css"

interface Props {
    text: string
    active: boolean
    toggleActive: (
        event:
            | React.MouseEvent<SVGElement, MouseEvent>
            | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => void | (() => void)
    width?: number
}

function InfoTextField({ text, active, toggleActive, width }: Props) {
    if (!active) {
        return null
    }

    return (
        <>
            <button
                type="button"
                onClick={toggleActive}
                className={style.modalTextBox}
                style={{ width: `${width}px` }}
            >
                {text}
            </button>
            <button
                type="button"
                onClick={toggleActive}
                className={style.modalBackground}
            >
                {" "}
            </button>
        </>
    )
}

export default InfoTextField
