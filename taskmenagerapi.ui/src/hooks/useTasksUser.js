import axios from 'axios'
import { useEffect, useState } from 'react'
import { getToken, getUser } from '../services/auth'

export const useTasksUser = () => {
	const [todo, setTodo] = useState([])
	const [originalTodo, setOriginalTodo] = useState([])
	const [completed, setCompleted] = useState([])

	const fetchTasksUser = async () => {
		const token = getToken()
		const userId = getUser()
		const response = await axios.get(`https://localhost:7219/api/User/${userId}/Todoes`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.status === 200) {
			setTodo(response.data)
			setOriginalTodo(response.data)

			const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || []
			setCompleted(completedTasks)
		} else {
			console.log('Error with fetch task')
		}
	}
	useEffect(() => {
		fetchTasksUser()
	}, [])

	return { todo, setTodo, originalTodo, setOriginalTodo, completed, setCompleted }
}
