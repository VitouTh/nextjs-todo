import firebase from './firebase';
import {addDoc, collection, doc, getDoc, getDocs, getFirestore, limit, orderBy, query, startAfter, startAt, updateDoc, where} from 'firebase/firestore';
import { async } from '@firebase/util';

const firestore = getFirestore(firebase);

export const getTodos = async () => {
    let datas = [];
    const docs = await getDocs(query(collection(firestore, 'nextjs-todo')));
    docs.forEach(
        doc => {
            const id = doc.id;
            const data = doc.data();
            datas.push({ 
                id,
                ...data,
            })
        }
    );
    return datas;
}