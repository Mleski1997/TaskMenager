import '../Layout/Layout.css'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import React, { useState } from 'react'

function Layout({ isAuthenticated, setIsAuthenticated, children }) {
	const navigate = useNavigate()
	const username = localStorage.getItem('username')
	const userRole = localStorage.getItem('roles')

	const handleLogout = () => {
		localStorage.removeItem('token')
		setIsAuthenticated(false)
		navigate('/')
		console.log('Logout success')
	}

	return (
		<>
			<Navbar bg='dark' variant='dark' className='fixed-top text-light'>
				<Container>
					<Navbar.Brand href='/TodoListUser'>TaskManager</Navbar.Brand>

					{isAuthenticated ? (
						<div className='nav text-light'>
							{userRole === 'admin' ? (
								<>
									<Nav.Link href='/userslistadmin'>UserList</Nav.Link>
									<Nav.Link href='/todolistadmin'>AllToDoList</Nav.Link>
									<Nav.Link href='/todolistuser'>ToDoList</Nav.Link>
									<span className='nav-text me-4'>Hello {username} </span>
									<Button variant='outline-light' onClick={handleLogout}>
										Logout
									</Button>
								</>
							) : (
								<>
									<span className='nav-text me-4'>Hello {username} </span>
									<Button variant='outline-light' onClick={handleLogout}>
										Logout
									</Button>
								</>
							)}
						</div>
					) : (
						<>
							<Nav className='me-auto'>
								<Nav.Link href='/'>Home</Nav.Link>
							</Nav>
						</>
					)}
				</Container>
			</Navbar>

			{children}
		</>
	)
}

export default Layout
