export const statusEnum = {
	Success: 'Success',
	InProgress: 'InProgress',
	Blocked: 'Blocked',
}

export const startEditing = (
	taskId,
	todo,
	setIsEditing,
	setEditingTask,
	title,
	description,
	dueDate,
	format,
	status
) => {
	const taskToEdit = todo.find(task => task.id === taskId)
	if (!taskToEdit) {
		return
	}

	setIsEditing(true)
	setEditingTask(taskId)
	populateFormFields(title, description, dueDate, status, taskToEdit, format)
}

const populateFormFields = (title, description, dueDate, status, taskToEdit, format) => {
	title.current.value = taskToEdit.title
	description.current.value = taskToEdit.description
	dueDate.current.value = format(new Date(taskToEdit.dueDate), 'yyyy-MM-dd')
	status.current.value = taskToEdit.status
}

export const sortByDate = (todo, setTodo) => {
	const sortedTodoItems = [...todo]
	sortedTodoItems.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
	setTodo(sortedTodoItems)
}

export const sortByStatus = (todo, setTodo) => {
	const sortedTodoItems = [...todo]
	sortedTodoItems.sort((a, b) => a.status.localeCompare(b.status))
	setTodo(sortedTodoItems)
}

export const sortById = (todo, setTodo) => {
	const sortedUserIdItems = [...todo]
	sortedUserIdItems.sort((a, b) => a.userId.localeCompare(b.userId))
	setTodo(sortedUserIdItems)
}

export const searchTodo = (searchTerm, originalTodo, setSearchResults) => {
	if (typeof searchTerm !== 'string') {
		return
	}

	const filteredTasks = originalTodo.filter(task => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
	setSearchResults(filteredTasks)
}

export const handleKeyDown = event => {
	if (event.key === 'Enter') {
		event.preventDefault()
	}
}

export const clearFormFields = (title, description, dueDate, status) => {
	title.current.value = ''
	description.current.value = ''
	dueDate.current.value = ''
	status.current.value = ''
}

export const successTodo = (taskId, todo, setTodo, updatedSuccess, completed, setCompleted, statusEnum) => {
	const updatedCompletedTask = [...completed, taskId]
	setCompleted(updatedCompletedTask)
	localStorage.setItem('completedTasks', JSON.stringify(updatedCompletedTask))

	const taskIndex = todo.findIndex(task => task.id === taskId)
	if (taskIndex === -1) {
		return
	}

	const updatedTodo = [...todo]
	updatedTodo[taskIndex].status = statusEnum.Success

	updatedSuccess(taskId, updatedTodo[taskIndex])
		.then(response => {
			setTodo(updatedTodo)
		})
		.catch(error => {
			console.error('Error updating task:', error)
		})
}

export const GetUserIdForTask = (editingTask, todo) => {
	const task = todo.find(task => task.id === editingTask)
	return task ? task.userId : 'Something went wrong'
}
