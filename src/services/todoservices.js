import axios from 'axios'
import { getToken, getUser } from './auth'
import { clearFormFields } from '../utils/toDoUtils'

const token = getToken()
const userId = getUser()

const apiUrl = 'https://localhost:7219/api/ToDo'

export async function addTodo(title, description, dueDate, todo, setTodo, status) {
	try {
		const payload = {
			title: title.current.value,
			description: description.current.value,
			dueDate: dueDate.current.value,
			status: status.current.value,
			userId: userId,
		}

		const response = await axios.post(`https://localhost:7219/api/ToDo?userId=${userId}`, payload, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.status === 200) {
			setTodo([...todo, response])
			clearFormFields()
		} else {
			console.log(response)
		}
	} catch (error) {
		console.error('Error adding task', error)
		throw error
	}
}

export async function editTodo(
	title,
	description,
	dueDate,
	todo,
	setTodo,
	status,
	token,
	taskId,
	editingTask,
	setIsEditing
) {
	try {
		const updatedTask = {
			title: title.current.value,
			description: description.current.value,
			dueDate: dueDate.current.value,
			status: status.current.value,
			userId: userId,
		}

		const response = await axios.put(`https://localhost:7219/api/ToDo/${taskId}`, updatedTask, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.status === 200) {
			const updatedTodo = [...todo]
			const taskIndex = updatedTodo.findIndex(task => task.id === editingTask)
			if (taskIndex !== -1) {
				updatedTodo[taskIndex] = response
				setTodo(updatedTodo)
			}

			setIsEditing(false)
			clearFormFields()
		} else {
			console.log(response)
		}
	} catch (error) {
		console.error('Error adding task', error)
		throw error
	}
}

export async function addOrUpdateTodo(
	title,
	description,
	dueDate,
	isEditing,
	editingTask,
	todo,
	setTodo,
	setIsEditing,
	status
) {
	const formData = {
		title: title.current.value,
		description: description.current.value,
		dueDate: dueDate.current.value,
		status: status.current.value,
		userId: userId,
	}

	if (isEditing) {
		editTodo(token, editingTask, formData)
			.then(response => {
				const updatedTodo = [...todo]
				const taskIndex = updatedTodo.findIndex(task => task.id === editingTask)
				if (taskIndex !== -1) {
					updatedTodo[taskIndex] = response
					setTodo(updatedTodo)
				}

				setIsEditing(false)
				clearFormFields()
			})
			.catch(error => {
				console.error('Error editing task', error)
				console.error(error.response.data)
			})
	} else {
		addTodo(token, userId, formData)
			.then(response => {
				setTodo([...todo, response])
				clearFormFields()
			})
			.catch(error => {
				console.error('Error adding task', error)
				console.error(error.response.data)
			})
	}
}

export async function updatedSuccess(taskId, updatedData, token) {
	try {
		const response = await axios.put(`${apiUrl}/${taskId}`, updatedData, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		if (response.status === 200) {
			return response.data
		} else {
			console.error('Failed to fetch tasks')
			return []
		}
	} catch (error) {
		console.error('Error:', error)
		return []
	}
}

export async function deleteTodo(taskId, todo, setTodo) {
	try {
		await axios.delete(`${apiUrl}/${taskId}`)
		const updatedTasks = todo.filter(todo => todo.id !== taskId)
		setTodo(updatedTasks)
	} catch (error) {
		console.error('Error deleting task', error)
		throw error
	}
}
