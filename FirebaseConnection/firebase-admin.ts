import * as admin from "firebase-admin"

if (process.env.PRIVATE_KEY) {
    const { privateKey } = JSON.parse(process.env.PRIVATE_KEY)

    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.PROJECT_ID,
                privateKey,
                clientEmail: process.env.CLIENT_EMAIL,
            }),
        })
    }
}

const database = admin.firestore()

export default database
