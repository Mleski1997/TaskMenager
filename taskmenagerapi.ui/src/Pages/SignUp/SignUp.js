import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'
import { handleSignUp } from '../../services/signupServices'
import axios from 'axios'
import './signUp.css'

function SignUp() {
	const [username, setUsername] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [checkpassword, checkPassword] = useState('')
	const [error, setError] = useState('')

	const navigate = useNavigate()

	const handleSignUpClick = async () => {
		if (password !== checkpassword) {
			setError('Password and Confrim Password do not match')
			return
		} else {
			try {
				const success = await axios.post('https://localhost:7219/api/Account/register', {
					username,
					email,
					password,
				})

				if (success) {
					navigate('/')
				} else {
					setError('Registration failed')
				}
			} catch (error) {
				if (error.response && error.response.status === 400) {
					setError('Password must have one uppercase, lowercase, special sign, digit ')
				} else {
					setError('Error: ' + error.message)
				}
			}
		}
	}
	const handleKeyDown = event => {
		if (event.key === 'Enter') {
			event.preventDefault()
			handleSignUpClick()
		}
	}

	return (
		<>
			<section id='register'>
				<div className='register-container'>
					<Form className='register-form'>
						<Form.Group className='mb-3' controlId='Username'>
							<Form.Label>Username</Form.Label>
							<Form.Control
								className='custom-form-control'
								type='string'
								placeholder='Username'
								value={username}
								onChange={e => setUsername(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group className='mb-3' controlId='Email'>
							<Form.Label>Email</Form.Label>
							<Form.Control
								className='custom-form-control'
								type='email'
								placeholder='Email'
								value={email}
								onChange={e => setEmail(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group className='mb-3' controlId='password'>
							<Form.Label>Password</Form.Label>
							<Form.Control
								className='custom-form-control'
								type='password'
								placeholder='password'
								value={password}
								onChange={e => setPassword(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group className='mb-3' controlId='confimPassword'>
							<Form.Label>ConfirmPassword</Form.Label>

							<Form.Control
								className='custom-form-control'
								type='password'
								placeholder='password'
								onKeyDown={handleKeyDown}
								value={checkpassword}
								onChange={e => checkPassword(e.target.value)}></Form.Control>
						</Form.Group>
						{error && <p className='error'>{error}</p>}
						<Button className='BtnLogin' variant='outline-light' onClick={handleSignUpClick}>
							Register
						</Button>{' '}
						<a href='/' className='loginLink'>
							Login
						</a>
					</Form>
				</div>
			</section>
		</>
	)
}

export default SignUp
