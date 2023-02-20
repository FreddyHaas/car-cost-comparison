import React from "react"
import style from "@/styles/Results.module.css"

interface Props {
    costScore: string
}

function CostScore({ costScore }: Props) {
    let boxes: any

    if (costScore === "very cheap") {
        boxes = { color: "#287d0e", count: 5 }
    }

    if (costScore === "cheap") {
        boxes = { color: "#52a11a", count: 4 }
    }

    if (costScore === "medium") {
        boxes = { color: "#80bd24", count: 3 }
    }

    if (costScore === "expensive") {
        boxes = { color: "#dea505", count: 2 }
    }

    if (costScore === "very expensive") {
        boxes = { color: "#e78829", count: 1 }
    }

    const colorBoxDisplay: JSX.Element[] = []

    for (let i = 0; i < 5; i += 1) {
        if (i < boxes.count) {
            colorBoxDisplay.push(
                <div key={i} style={{ backgroundColor: boxes.color }}>
                    &nbsp;
                </div>
            )
        } else {
            colorBoxDisplay.push(
                <div key={i} style={{ backgroundColor: "#eae8e8" }}>
                    &nbsp;
                </div>
            )
        }
    }

    return <div className={style.costScore}>{colorBoxDisplay}</div>
}

export default CostScore
