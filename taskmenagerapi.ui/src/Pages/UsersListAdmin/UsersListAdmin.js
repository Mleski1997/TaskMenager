import Table from 'react-bootstrap/esm/Table'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import { deleteUser, toggleUserActiveStatus } from '../../services/userlistServices'
import { User } from '../../components/shared/Users/user'

import './usersListAdmin.css'
import { useUsers } from '../../hooks/useUsers'
import { UserHeader } from '../../components/shared/Users/userheader'
import './usersListAdmin.css'

function UsersListAdmin() {
	const { users, setUsers } = useUsers()

	return (
		<>
			<section id='usersadmin'>
				<Container>
					<Table striped bordered hover className='transparent-table'>
						<UserHeader />
						<tbody>
							{users.map((user, index) => (
								<tr key={user.id}>
									<User
										user={user}
										index={index}
										key={user.id}
										setUsers={setUsers}
										Button={Button}
										deleteUser={deleteUser}
										toggleUserActiveStatus={toggleUserActiveStatus}
										users={users}
									/>
								</tr>
							))}
						</tbody>
					</Table>
				</Container>
			</section>
		</>
	)
}

export default UsersListAdmin
