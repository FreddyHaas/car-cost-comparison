import React, { useState } from "react"
import { DocumentData } from "firebase/firestore"
import SearchContext from "./context"

export default function SearchProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const [brandRangeList, setBrandRangeList] = useState<
        DocumentData | undefined
    >(undefined)
    const [brandList, setBrandList] = useState<string[] | undefined>(undefined)
    const [brand, setBrand] = useState<string | undefined>(undefined)
    const [rangeList, setRangeList] = useState<string[] | undefined>(undefined)
    const [range, setRange] = useState<string | undefined>(undefined)
    const [variantModelList, setVariantModelList] = useState<
        DocumentData | undefined
    >(undefined)
    const [variantList, setVariantList] = useState<string[] | undefined>(
        undefined
    )
    const [variant, setVariant] = useState<string | undefined>(undefined)
    const [modelList, setModelList] = useState<string[] | undefined>(undefined)
    const [model, setModel] = useState<string | undefined>(undefined)
    const [months, setMonths] = useState<number>(60)
    const [kilometers, setKilometers] = useState<number>(15000)
    const [vehicleClass, setVehicleClass] = useState<string>("AlleVehicleClass")
    const [bodyType, setBodyType] = useState<string>("AlleBodyType")
    const [motorType, setMotorType] = useState<string>("AlleMotorType")
    const [searchByModel, setSearchByModel] = useState<boolean>(true)

    return (
        <SearchContext.Provider
            value={{
                brandRangeList,
                setBrandRangeList,
                brandList,
                setBrandList,
                brand,
                setBrand,
                rangeList,
                setRangeList,
                range,
                setRange,
                variantModelList,
                setVariantModelList,
                variantList,
                setVariantList,
                variant,
                setVariant,
                modelList,
                setModelList,
                model,
                setModel,
                months,
                setMonths,
                kilometers,
                setKilometers,
                vehicleClass,
                setVehicleClass,
                bodyType,
                setBodyType,
                motorType,
                setMotorType,
                searchByModel,
                setSearchByModel,
            }}
        >
            {children}
        </SearchContext.Provider>
    )
}
