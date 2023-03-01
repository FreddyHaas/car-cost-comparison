import React from "react"
import style from "@/src/styles/Search.module.css"

interface Props {
    optionList: string[]
    valueList: string[]
    label: string
    selector: React.Dispatch<React.SetStateAction<string>>
    selectedOption: string
    smallView: boolean
}

function MultiOptionSearchField({
    optionList,
    valueList,
    selectedOption,
    selector,
    label,
    smallView,
}: Props) {
    const { length } = optionList

    const options: JSX.Element[] = []

    const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target as HTMLInputElement
        const { value } = target
        selector(value)
    }

    for (let i = 0; i < length; i += 1) {
        options.push(
            <label
                key={`${valueList[i]}`}
                className={style.label}
                htmlFor={`${valueList[i]}`}
            >
                <input
                    onChange={handleSubmit}
                    className={style.styledInput}
                    type="radio"
                    value={`${valueList[i]}`}
                    id={`${valueList[i]}`}
                    checked={selectedOption === valueList[i]}
                />
                <div
                    className={style.checkboxContainer}
                    id={style.checkboxContainer}
                >
                    {optionList[i]}
                </div>
            </label>
        )
    }

    return (
        <div className={style.formFieldCheapSearch}>
            <h3 className={style.header}>{label}</h3>
            <fieldset
                className={`${smallView ? style.optionsSmall : style.options}`}
            >
                {options}
            </fieldset>
        </div>
    )
}

export default MultiOptionSearchField
