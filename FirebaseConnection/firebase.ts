import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebase = initializeApp({
    apiKey: "AIzaSyBxuMY0xzfcADKhEjCvZK7d_D1D2SqhpfQ",
    authDomain: "car-cost-comparison.firebaseapp.com",
    projectId: "car-cost-comparison",
    storageBucket: "car-cost-comparison.appspot.com",
    messagingSenderId: "656588600194",
    appId: "1:656588600194:web:c7b574f0b75a23e66cd59b",
})

// eslint-disable-next-line import/prefer-default-export
export const firestore = getFirestore(firebase)