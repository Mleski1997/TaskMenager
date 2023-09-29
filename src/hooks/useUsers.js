import axios from 'axios'
import { useEffect, useState } from 'react'

import { getToken, getUser } from '../services/auth'


export const useUsers = () => {
	const [users, setUsers] = useState([])

	const fetchUsers = async () => {
		const token = getToken()
		const response = await axios.get(`https://localhost:7219/api/User`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
		if (response.status === 200) {
			const filteredUsers = response.data.filter(user => user.userName !== 'admin')
			setUsers(filteredUsers)
		} else {
			console.error('Failed to fetch tasks')
		}
	}

	useEffect(() => {
		fetchUsers()
	}, [])

	return { users, setUsers }
}
