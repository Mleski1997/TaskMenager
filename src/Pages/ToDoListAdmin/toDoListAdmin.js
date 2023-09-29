import React, { useState, useRef } from 'react'

import { updatedSuccess, deleteTodo, addOrUpdateTodo } from '../../services/todoservices'
import { Tasks } from '../../components/shared/Tasks/tasks'

import { TableHeader } from '../../components/shared/Table/tableheader'
import { Sort } from '../../components/shared/Table/sort'
import { Todoform } from '../../components/shared/Tasks/tasksform'

import { sortByDate, sortByStatus, sortById, searchTodo, successTodo, startEditing } from '../../utils/toDoUtils'

import { useTasksAdmin } from '../../hooks/useTasksAdmin'

import format from 'date-fns/format'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import Container from 'react-bootstrap/Container'

import './toDoListAdmin.css'

function ToDoListUser() {
	const { todo, setTodo, originalTodo, completed, setCompleted, setOriginalTodo } = useTasksAdmin()

	const [isEditing, setIsEditing] = useState(false)
	const [editingTask, setEditingTask] = useState(null)
	const [searchResults, setSearchResults] = useState([])
	const [searchTerm, setSearchTerm] = useState('')

	const title = useRef('')
	const description = useRef('')
	const dueDate = useRef('')
	const status = useRef('')

	return (
		<>
			<section id='todosectionadmin'>
				<Form className='form-box--admin'>
					<Todoform
						title={title}
						description={description}
						dueDate={dueDate}
						status={status}
						isEditing={isEditing}
						editingTask={editingTask}
						todo={todo}
						setTodo={setTodo}
						setIsEditing={setIsEditing}
						setEditingTask={setEditingTask}
					/>
					<Sort
						todo={todo}
						setTodo={setTodo}
						sortByDate={sortByDate}
						sortByStatus={sortByStatus}
						sortById={sortById}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						searchTodo={searchTodo}
						originalTodo={originalTodo}
						setSearchResults={setSearchResults}
					/>
				</Form>

				<Container className='todo-box--admin'>
					{todo.length === 0 ? (
						<p>Add new task...</p>
					) : (
						<Table responsive hover borderless className='transparent-table'>
							<TableHeader />
							<tbody>
								{searchResults.length === 0
									? todo.map((task, index) => (
											<tr key={task.id}>
												<Tasks
													task={task}
													index={index}
													completed={completed}
													setCompleted={setCompleted}
													updatedSuccess={updatedSuccess}
													deleteTodo={deleteTodo}
													format={format}
													setTodo={setTodo}
													status={status}
													setIsEditing={setIsEditing}
													setEditingTask={setEditingTask}
													dueDate={dueDate}
													description={description}
													title={title}
													successTodo={successTodo}
													todo={todo}
													startEditing={startEditing}
												/>
											</tr>
									  ))
									: searchResults.map((task, index) => (
											<tr key={task.id}>
												<Tasks
													task={task}
													index={index}
													completed={completed}
													setCompleted={setCompleted}
													updatedSuccess={updatedSuccess}
													deleteTodo={deleteTodo}
													format={format}
													setTodo={setTodo}
													status={status}
													setIsEditing={setIsEditing}
													setEditingTask={setEditingTask}
													dueDate={dueDate}
													description={description}
													title={title}
													successTodo={successTodo}
													todo={todo}
													startEditing={startEditing}
												/>
											</tr>
									  ))}
							</tbody>
						</Table>
					)}
				</Container>
			</section>
		</>
	)
}

export default ToDoListUser
