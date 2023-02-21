import firebase from './firebase';
import { addDoc, setDoc, deleteDoc, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

const firestore = getFirestore(firebase);

export const getTodos = async() => {
    try {
        const query_data = collection(firestore, "todos");
        const snapshot = await getDocs(query_data);
        const docs = snapshot.docs.map((doc) => {
            const data = doc.data()
            data.id = doc.id
            return data
        })
        return docs
    } catch (err) {
        console.log(err)
    }
}

export const addTodo = async({ id, todo, isCompleted }) => {
    try {
        await setDoc(doc(firestore, "todos", id), {
            todo: todo,
            isCompleted: isCompleted,
            createdAt: new Date().getTime(),
        });
    } catch (err) {
        console.log(err)
    }
}

export const changeCompleted = async({ id, isCompleted }) => {
    try {
        const todoRef = doc(firestore, "todos", id);
        await updateDoc(todoRef, {
            isCompleted,
        });
    } catch (err) {
        console.log(err);
    }
}

export const deleteTodo = async(id) => {
    try {
        const todoRef = doc(firestore, "todos", id);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
}
export const updateTodo = async(id, { todo, isCompleted }) => {
    try {
        const todoRef = doc(firestore, "todos", id);
        await updateDoc(todoRef, {
            todo,
            isCompleted,
        });
    } catch (err) {
        console.log(err);
    }
}