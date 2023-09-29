import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { statusEnum } from '../../../utils/toDoUtils'
import { addOrUpdateTodo, addTodo, editTodo } from '../../../services/todoservices'
import { handleKeyDown } from '../../../utils/toDoUtils'
import format from 'date-fns/format'

export function Todoform(props) {
	const {
		title,
		description,
		dueDate,
		isEditing,
		editingTask,
		todo,
		setTodo,
		setIsEditing,
		status,
		userId,
		token,
		clearFormFields,
	} = props

	return (
		<>
			<Form.Group className='mb-3 form-group' controlId='title'>
				<Form.Label>Title</Form.Label>
				<Form.Control type='title' placeholder='title' ref={title} />
			</Form.Group>

			<Form.Group className='mb-3 form-group' controlId='description'>
				<Form.Label>Description</Form.Label>
				<Form.Control as='textarea' rows={1} placeholder='description' ref={description} />
			</Form.Group>

			<div className='form-bottom'>
				<Form.Group controlId='status' className='status'>
					<Form.Label>Status</Form.Label>
					<Form.Select ref={status}>
						<option value={statusEnum.InProgress}>InProgress</option>
						<option value={statusEnum.Blocked}>Blocked</option>
					</Form.Select>
				</Form.Group>

				<Form.Group className='date mb-3 form-group' controlId='duedate'>
					<Form.Label>Date</Form.Label>
					<Form.Control type='date' placeholder='description' ref={dueDate} />
				</Form.Group>
			</div>
			<Button
				variant='outline-light'
				className='BtnSubmit mb-3 w-100'
				type='submit'
				onClick={() => {
					if (isEditing) {
						editTodo(title, description, dueDate, todo, setTodo, status, token, editingTask, setIsEditing)
					} else {
						addTodo(title, description, dueDate, todo, setTodo, status)
					}
				}}
				onKeyDown={handleKeyDown}>
				{isEditing ? 'Edit' : 'Add'}
			</Button>
		</>
	)
}
