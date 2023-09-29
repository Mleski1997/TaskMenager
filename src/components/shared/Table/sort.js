
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

export function Sort(props) {
	const{sortByDate, todo, setTodo, sortByStatus, sortById, searchTodo, searchTerm, originalTodo, setSearchResults, setSearchTerm} = props
    




	return (
		<>
			<div className='form-button--admin'>
				<Dropdown>
					<Dropdown.Toggle variant='success' className='BtnSort mb-3'>
						Sort
					</Dropdown.Toggle>

					<Dropdown.Menu>
						<Dropdown.Item href='#/action-1' onClick={() => sortByDate(todo, setTodo)}>
							Date
						</Dropdown.Item>
						<Dropdown.Item href='#/action-2' onClick={() => sortByStatus(todo, setTodo)}>
							Status
						</Dropdown.Item>
						<Dropdown.Item href='#/action-3' onClick={() => sortById(todo, setTodo)}>
							UserID
						</Dropdown.Item>
					</Dropdown.Menu>
				</Dropdown>
				<div className='search-box'>
					<Form.Control
						type='text'
						placeholder='search'
						aria-label='Search'
						value={searchTerm}
						onChange={e => setSearchTerm(e.target.value)}></Form.Control>
					<Button
						variant='success'
						className='BtnSearch'
						onClick={() => searchTodo(searchTerm, originalTodo, setSearchResults)}>
						Search
					</Button>
				</div>
			</div>
		</>
	)
}
