export function User(props) {
	const { user, index, Button, deleteUser, users, setUsers, toggleUserActiveStatus} = props

	return (
		<>
			<td>{index + 1}</td>
			<td>{user.userName}</td>
			<td>{user.email}</td>
			<td>
				<Button variant='danger' onClick={() => deleteUser(user.id, users, setUsers)}>
					Delete
				</Button>{' '}
				<Button
					variant={user.isActive ? 'danger' : 'success'}
					onClick={() => toggleUserActiveStatus(user.id, !user.isActive, users, setUsers)}>
					{user.isActive ? 'Ban' : 'Unban'}
				</Button>
			</td>
		</>
	)
}
