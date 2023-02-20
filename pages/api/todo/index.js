import {getTodos} from '@firebase/firestore'

export default function handler(req, res) {
    res.status(200).json({ name: getTodos })
  }