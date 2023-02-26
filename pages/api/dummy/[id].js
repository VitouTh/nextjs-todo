// pages/api/todo/[id].js
import { useRouter } from 'next/router';
import { getTodoById, updateTodoById, deleteTodoById } from './data';

export default function handler(req, res) {
    let { id } = req.query;
    let todo = getTodoById(id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    if (req.method === 'GET') {
        // Return the details of the specified todo
        res.status(200).json(todo);
    } else if (req.method === 'PUT') {
        // Update the specified todo
        let { newTodo, isCompleted } = JSON.parse(req.body);
        let updatedTodo = updateTodoById(id, { newTodo, isCompleted });
        res.status(200).json(updatedTodo);
    } else if (req.method === 'DELETE') {
        deleteTodoById(id);
        res.status(204).end();
    } else {
        res.status(405).json({ error: `Method ${req.method} is not allowed` })
    }
}