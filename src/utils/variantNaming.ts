export default function fixVariantNaming(variantName: string) {
    if (variantName === "Geländewagen" || variantName === "Pick-Up")
        return "SUV"

    if (variantName === "Hochdach-Kombi") return "Kombi"

    if (variantName === "Transporter" || variantName === "Wohnmobil")
        return "Bus"

    if (variantName === "Stufenheck") return "Limousine"

    if (variantName === "Coupe") return "Coupé"

    return variantName
}
