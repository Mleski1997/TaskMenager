import axios from 'axios'
import { getToken, getUser } from './auth'

const token = getToken()
const userId = getUser()



export async function deleteUser(userId, users, setUsers) {
	try {
		await axios.delete(`https://localhost:7219/api/User/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})

		const updatedUsers = users.filter(user => user.id !== userId)
		setUsers(updatedUsers)
	} catch (error) {
		console.error('Error:', error)
	}
}

export async function toggleUserActiveStatus(userId, isActive, users,setUsers) {
	try {
		const response = await axios.put(
			`https://localhost:7219/api/User/${userId}/Active`,
			{ isActive },
			{
				headers: {
					Authorization: `Bearer ${token}`,
				},
			}
		)

		if (response.status === 200) {
			const updatedUsers = users.map(user => (user.id === userId ? { ...user, isActive } : user))
			setUsers(updatedUsers)
		} else {
			console.error('Failed to update user status')
		}
	} catch (error) {
		console.error('Error:', error)
	}
}
