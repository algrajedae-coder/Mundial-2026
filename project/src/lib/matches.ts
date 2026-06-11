import { db } from "@/app/lib/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

const matchesRef = collection(db, "matches");

// ➕ Crear partido
export const createMatch = async (data: any) => {
  return await addDoc(matchesRef, {
    ...data,
    createdAt: new Date().toISOString()
  });
};

// ✏️ Editar partido
export const updateMatch = async (id: string, data: any) => {
  const ref = doc(db, "matches", id);
  return await updateDoc(ref, data);
};

// 🗑️ Eliminar partido
export const deleteMatch = async (id: string) => {
  const ref = doc(db, "matches", id);
  return await deleteDoc(ref);
};
