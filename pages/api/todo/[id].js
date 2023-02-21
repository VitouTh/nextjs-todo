import { updateTodo, deleteTodo } from '../../../firebase/firestore'

export default async function handler(req, res) {
    if (req.method == 'PUT') {
        try {
            const data = await updateTodo(req.query.id, req.body);
            return res.status(200).json({ data: data });
        } catch (error) {
            return res.status(400).json({ message: 'Error' });
        }
    } else if (req.method == 'DELETE') {
        try {
            const data = await deleteTodo(req.query.id);
            return res.status(200).json({ data: data });
        } catch (error) {
            return res.status(400).json({ message: 'Error' });
        }
    } else {
        return res.status(500).json({ message: 'METHOD IS NOT ALLOWED' })
    }
}