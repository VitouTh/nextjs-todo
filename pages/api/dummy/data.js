// shared/todos.js
import { v4 as uuidv4 } from 'uuid';

// Dummy data
let todos = [
    { id: uuidv4(), todo: 'Buy groceries', isCompleted: false, createdAt: Date.now() },
    { id: uuidv4(), todo: 'Do laundry', isCompleted: true, createdAt: Date.now() },
    { id: uuidv4(), todo: 'Clean room', isCompleted: false, createdAt: Date.now() },
];

export function getTodos() {
    return todos;
}

export function addTodo(todo) {
    let newTodo = { id: uuidv4(), todo, isCompleted: false, createdAt: Date.now() };
    todos.push(newTodo);
    return newTodo;
}

export function getTodoById(id) {
    return todos.find((t) => t.id === id);
}

export function updateTodoById(id, { newTodo, isCompleted }) {
    let todo = todos.find((t) => t.id === id);
    console.log({ newTodo, isCompleted })
    if (newTodo !== undefined) {
        todo.todo = newTodo;
    }
    if (isCompleted !== undefined) {
        todo.isCompleted = isCompleted;
    }
    return todo;
}

export function deleteTodoById(id) {
    todos = todos.filter((t) => t.id !== id);
}