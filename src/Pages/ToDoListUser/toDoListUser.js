import React, { useState, useRef } from 'react'
import { Todoform } from '../../components/shared/Tasks/tasksform'
import { Sort } from '../../components/shared/Table/sort'
import { Tasks } from '../../components/shared/Tasks/tasks'

import { updatedSuccess, deleteTodo } from '../../services/todoservices'
import { sortByDate, sortByStatus, sortById, searchTodo, successTodo, startEditing } from '../../utils/toDoUtils'

import format from 'date-fns/format'

import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'

import './toDoListUser.css'
import { useTasksUser } from '../../hooks/useTasksUser'
import { TableHeader } from '../../components/shared/Table/tableheader'

function ToDoListUser() {
	const { todo, setTodo, originalTodo, setOriginalTodo, completed, setCompleted } = useTasksUser()

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
			<section id='todosection'>
				<div className='todo-img'>
					<div className='todo-img--shadow'></div>
				</div>

				<Form className='form-box'>
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

				<div className='todo-box'>
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
				</div>
			</section>
		</>
	)
}

export default ToDoListUser
