import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  onSnapshot,
} from 'firebase/firestore'
import { db } from './config'

const RESERVATIONS_COLLECTION = 'reservations'

export async function createReservation(data) {
  const reservation = {
    ...data,
    status: 'pendente',
    createdAt: Timestamp.now(),
    date: data.date,
  }
  const docRef = await addDoc(collection(db, RESERVATIONS_COLLECTION), reservation)
  return { id: docRef.id, ...reservation }
}

export async function getReservations() {
  const q = query(
    collection(db, RESERVATIONS_COLLECTION),
    orderBy('createdAt', 'desc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function getReservationsByDate(date) {
  const q = query(
    collection(db, RESERVATIONS_COLLECTION),
    where('date', '==', date),
    orderBy('time', 'asc')
  )
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export async function updateReservationStatus(id, status) {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id)
  await updateDoc(docRef, { status })
}

export async function deleteReservation(id) {
  const docRef = doc(db, RESERVATIONS_COLLECTION, id)
  await deleteDoc(docRef)
}

export function onReservationsSnapshot(callback) {
  const q = query(
    collection(db, RESERVATIONS_COLLECTION),
    orderBy('createdAt', 'desc')
  )
  return onSnapshot(q, (snapshot) => {
    const reservations = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(reservations)
  })
}
