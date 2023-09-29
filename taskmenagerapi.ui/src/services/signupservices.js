import axios from 'axios'

export async function handleSignUp() {
	try {
		const response = await axios.post('https://localhost:7219/api/Account/register')

		if (response.status === 200) {
			console.log('registarion successful')
			return true
		} else {
			return false
		}
	} catch (error) {
		console.log('Error', error)
		throw error
	}
}


