import { DocumentData } from "firebase/firestore"
import { createContext, Dispatch, SetStateAction } from "react"

interface Hooks {
    brandRangeList: DocumentData | undefined
    setBrandRangeList: Dispatch<SetStateAction<DocumentData | undefined>>

    brandList: string[] | undefined
    setBrandList: Dispatch<SetStateAction<string[] | undefined>>

    brand: string | undefined
    setBrand: Dispatch<SetStateAction<string | undefined>>

    rangeList: string[] | undefined
    setRangeList: Dispatch<SetStateAction<string[] | undefined>>

    range: string | undefined
    setRange: Dispatch<SetStateAction<string | undefined>>

    variantModelList: DocumentData | undefined
    setVariantModelList: Dispatch<SetStateAction<DocumentData | undefined>>

    variantList: string[] | undefined
    setVariantList: Dispatch<SetStateAction<string[] | undefined>>

    variant: string | undefined
    setVariant: Dispatch<SetStateAction<string | undefined>>

    modelList: string[] | undefined
    setModelList: Dispatch<SetStateAction<string[] | undefined>>

    model: string | undefined
    setModel: Dispatch<SetStateAction<string | undefined>>

    months: number
    setMonths: Dispatch<SetStateAction<number>>

    kilometers: number
    setKilometers: Dispatch<SetStateAction<number>>

    vehicleClass: string
    setVehicleClass: Dispatch<SetStateAction<string>>

    bodyType: string
    setBodyType: Dispatch<SetStateAction<string>>

    motorType: string
    setMotorType: Dispatch<SetStateAction<string>>

    searchByModel: boolean
    setSearchByModel: Dispatch<SetStateAction<boolean>>
}

const SearchContext = createContext<Hooks>({
    brandRangeList: undefined,
    setBrandRangeList: (brandRangeList) =>
        console.log(`BrandRangelist: ${brandRangeList}`),

    brandList: undefined,
    setBrandList: (brandList) => console.log(`BrandList: ${brandList}`),

    brand: undefined,
    setBrand: (brand) => console.log(`Brand:${brand}`),

    rangeList: undefined,
    setRangeList: (rangeList) => console.log(`RangeList: ${rangeList}`),

    range: undefined,
    setRange: (range) => console.log(`Range:${range}`),

    variantModelList: undefined,
    setVariantModelList: (variantModelList) =>
        console.log(`VariantModelList: ${variantModelList}`),

    variantList: undefined,
    setVariantList: (variantList) => console.log(`VariantList: ${variantList}`),

    variant: undefined,
    setVariant: (variant) => console.log(`Variant: ${variant}`),

    modelList: undefined,
    setModelList: (modelList) => console.log(`ModelList: ${modelList}`),

    model: undefined,
    setModel: (model) => console.log(`Model: ${model}`),

    months: 60,
    setMonths: (months) => console.log(`Months: ${months}`),

    kilometers: 15000,
    setKilometers: (kilometers) => console.log(`Kilometers: ${kilometers}`),

    vehicleClass: "AlleVehicleClass",
    setVehicleClass: (vehicleClass) =>
        console.log(`Vehicle class: ${vehicleClass}`),

    bodyType: "AlleBodyType",
    setBodyType: (bodyType) => console.log(`Body type: ${bodyType}`),

    motorType: "AlleMotorType",
    setMotorType: (motorType) => console.log(`Motor type: ${motorType}`),

    searchByModel: true,
    setSearchByModel: (searchByModel) =>
        console.log(`Search by Model: ${searchByModel}`),
})

export default SearchContext
