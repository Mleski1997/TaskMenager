import axios from 'axios'

export async function handleLogin(username, password) {
	try {
		const response = await axios.post('https://localhost:7219/api/Account/login', { userName: username, password })

		if (response.status === 200) {
			const { tokenString, userId, roles, userIsActive } = response.data
			localStorage.setItem('token', tokenString)
			localStorage.setItem('userId', userId)
			localStorage.setItem('username', username)
			localStorage.setItem('roles', roles)

			return true
		} else {
			return false
		}
	} catch (error) {
		console.log('Error', error)
		throw error
	}
}
