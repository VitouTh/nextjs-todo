import { getTodos, addTodo } from './data';

export default function handler(req, res) {
    if (req.method === 'GET') {
        // Return a list of all todos

        let todos = getTodos();
        res.status(200).json(todos);
    } else if (req.method === 'POST') {
        // Create a new todo
        let todo_data = JSON.parse(req.body);
        todo_data = todo_data.todo;
        if (!todo_data) {
            return res.status(400).json({ error: 'todo is required' });
        }
        let newTodo = addTodo(todo_data);
        res.status(201).json(newTodo);
    } else {
        res.status(405).json({ error: `Method $ { req.method }
            not allowed` });
    }
}