import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyCgpR9bJEzKot3FIikEnuxrhdXymuyxFBs',
  authDomain: 'gym-traning-9e098.firebaseapp.com',
  projectId: 'gym-traning-9e098',
  storageBucket: 'gym-traning-9e098.appspot.com',
  messagingSenderId: '188838526127',
  appId: '1:188838526127:web:43ecc0e09f2eaea240e85a',
}

const app = initializeApp(firebaseConfig)

const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }
