import { addDoc, collection, deleteDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useReducer } from "react";
import { db } from '../firebase/config';

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: false, error: null };
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null };
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null };
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload };
        default:
            return state;
    }
};

export const useFirestore = (koleksiyon) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const ref = collection(db, koleksiyon);

    const dokumanEkle = async (doc) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            const eklenenDokuman = await addDoc(ref, { ...doc, tarih: serverTimestamp() });
            dispatch({ type: 'ADDED_DOCUMENT', payload: eklenenDokuman });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    };

    const dokumanSil = async (id) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            await deleteDoc(doc(db, koleksiyon, id));
            dispatch({ type: 'DELETED_DOCUMENT' });
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
        }
    };

    const dokumanGüncelle = async (id, guncelVeri) => {
        dispatch({ type: 'IS_PENDING' });
        try {
            const docRef = await doc(db, koleksiyon, id);
            await updateDoc(docRef, guncelVeri);
            dispatch({ type: 'UPDATED_DOCUMENT', payload: guncelVeri });
            return guncelVeri;
        } catch (error) {
            dispatch({ type: 'ERROR', payload: error.message });
            return null;
        }
    };

    return { dokumanEkle, dokumanSil, response, dokumanGüncelle };
};
