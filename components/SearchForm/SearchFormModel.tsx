import React, { FormEvent, useState, useEffect } from "react"
import useSearch from "@/hooks/useSearch"
import { doc, getDoc } from "firebase/firestore"
import style from "@/styles/Search.module.css"
import { useRouter } from "next/router"
import { AiOutlineSearch } from "react-icons/ai"
import { firestore } from "../../FirebaseConnection/firebase"
import SearchField from "./SearchFields/SearchField"
import YearsField from "./SearchFields/YearsField"
import KilometersField from "./SearchFields/KilometersField"

interface Props {
    smallView: boolean
}

function SearchFormModel({ smallView }: Props) {
    // Initialize router
    const router = useRouter()

    // Hooks to select correct searchform
    const { searchByModel } = useSearch()

    // Hooks to store form input
    const { brandRangeList, setBrandRangeList } = useSearch()
    const { brandList, setBrandList } = useSearch()
    const { brand, setBrand } = useSearch()
    const { rangeList, setRangeList } = useSearch()
    const { range, setRange } = useSearch()
    const { variantModelList, setVariantModelList } = useSearch()
    const { variantList, setVariantList } = useSearch()
    const { variant, setVariant } = useSearch()
    const { modelList, setModelList } = useSearch()
    const { model, setModel } = useSearch()
    const { setMonths } = useSearch()
    const { setKilometers } = useSearch()
    const [errorMessage, setErrorMessage] = useState(false)

    // Load list of brands and associated ranges
    useEffect(() => {
        const loadBrandRangeList = async () => {
            const docRef = doc(firestore, "dropdownLists", "BrandRangeList")
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setBrandRangeList(docSnap.data())
            }
        }

        if (brandRangeList === undefined) {
            loadBrandRangeList()
        }
    }, [brandRangeList, setBrandRangeList])

    // If list of brands and ranges is loaded, extract list of brands
    useEffect(() => {
        if (brandRangeList !== undefined) {
            const brands = Object.keys(brandRangeList).sort()
            setBrandList(brands)
        }
    }, [brandRangeList, setBrandList])

    // If selected brand changes, create new list of possible ranges and reset range value
    useEffect(() => {
        if (brand && brandRangeList) {
            setRangeList(brandRangeList[brand])
        }
        setRange(undefined)
    }, [brand, brandRangeList, setRange, setRangeList])

    // If brand or range changes, load new list of possible variants and associated models
    useEffect(() => {
        const loadvariantModelList = async () => {
            const encodedName = encodeURIComponent(`${brand} ${range}`)
            const docRef = doc(firestore, "dropdownLists", encodedName)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                setVariantModelList(docSnap.data())
            }
        }

        if (brand !== undefined && range !== undefined) {
            loadvariantModelList()
        } else {
            setVariantModelList(undefined)
        }
    }, [brand, range, setVariantModelList])

    // If list of variants and models changes (i.e. brand or range changes), update list of variants and reset variant value
    useEffect(() => {
        if (variantModelList !== undefined) {
            setVariantList(Object.keys(variantModelList))
        } else {
            setVariantList(undefined)
        }
        setVariant(undefined)
    }, [variantModelList, setVariant, setVariantList])

    // If variant changes, update list of models and reset model value
    useEffect(() => {
        if (variant !== undefined && variantModelList !== undefined) {
            setModelList(variantModelList[variant])
        } else {
            setModelList(undefined)
        }
        setModel(undefined)
    }, [variant, variantModelList, setModel, setModelList])

    // Handle submit
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (
            brand !== undefined &&
            range !== undefined &&
            variant !== undefined &&
            model !== undefined
        ) {
            return router.push(`/${brand}/${range}/${variant}/${model}`)
        }
        if (
            brand !== undefined &&
            range !== undefined &&
            variant !== undefined
        ) {
            return router.push(`/${brand}/${range}/${variant}`)
        }
        if (brand !== undefined && range !== undefined) {
            return router.push(`/${brand}/${range}`)
        }
        if (brand !== undefined) {
            return router.push(`/${brand}`)
        }
        return setErrorMessage(true)
    }

    // Check if searchByModel is selected
    if (!searchByModel) {
        return null
    }

    return (
        <form
            className={`${
                smallView ? style.searchFormSmall : style.searchForm
            }`}
            onSubmit={handleSubmit}
        >
            <div className={style.fieldContainer}>
                <h3>Auto</h3>
                <SearchField
                    optionsList={brandList}
                    optionSetter={setBrand}
                    fieldName="Marke"
                    disabled={false}
                    dynamic={false}
                    defaultValue={brand}
                />
                <p
                    className={`${
                        errorMessage && brand === undefined
                            ? style.errorMessage
                            : style.errorMessageDisabled
                    }`}
                >
                    Bitte Marke auswählen
                </p>
                <SearchField
                    optionsList={rangeList}
                    optionSetter={setRange}
                    fieldName="Modell"
                    disabled={!brand}
                    dynamic={false}
                    defaultValue={range}
                />
                <SearchField
                    optionsList={variantList}
                    optionSetter={setVariant}
                    fieldName="Variante"
                    disabled={!range}
                    dynamic
                    defaultValue={variant}
                />
                <SearchField
                    optionsList={modelList}
                    optionSetter={setModel}
                    fieldName="Motor"
                    disabled={!variant}
                    dynamic
                    defaultValue={model}
                />
            </div>
            <div className={style.fieldContainer}>
                <h3>Fahrweise</h3>
                <YearsField setMonths={setMonths} />
                <KilometersField setKilometers={setKilometers} />
            </div>
            <button type="submit">
                <span className={style.buttonText}>Suche</span>{" "}
                <AiOutlineSearch className={style.searchIcon} />
            </button>
        </form>
    )
}

export default SearchFormModel
