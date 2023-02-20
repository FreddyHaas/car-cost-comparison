export default function fixVariantNaming(variantName: string) {
    let bodyType = variantName
    if (variantName === "Geländewagen" || variantName === "Pick-Up") {
        bodyType = "SUV"
    }
    if (variantName === "Hochdach-Kombi") {
        bodyType = "Kombi"
    }
    if (variantName === "Transporter" || variantName === "Wohnmobil") {
        bodyType = "Bus"
    }

    if (variantName === "Stufenheck") {
        bodyType = "Limousine"
    }

    if (variantName === "Coupe") {
        bodyType = "Coupé"
    }

    return bodyType
}
