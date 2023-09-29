import './App.css'
import Layout from './components/shared/Layout/Layout'

import { Route, Routes, Router, Navigate } from 'react-router-dom'
import Dashboard from './Pages/Dashboard/dashboard'
import ToDoListUser from './Pages/ToDoListUser/toDoListUser'
import ToDoListAdmin from './Pages/ToDoListAdmin/toDoListAdmin'
import UsersListAdmin from './Pages/UsersListAdmin/usersListAdmin'

import { useState } from 'react'
import SignUp from './Pages/SignUp/signUp'

const User_Types = {
	Public_User: 'Public User',
	Normal_User: 'User',
	Admin_User: 'admin',
}

const current_user_type = localStorage.getItem('roles')

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'))

	return (
		<Routes>
			<Route
				path='/'
				element={
					isAuthenticated ? <Navigate to='/todolistuser' /> : <Dashboard setIsAuthenticated={setIsAuthenticated} />
				}
			/>
			<Route
				path='/ToDoListAdmin'
				element={
					current_user_type === User_Types.Admin_User ? (
						<AdminElement>
							<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
								<ToDoListAdmin />
							</Layout>
						</AdminElement>
					) : (
						<div>You don't have access to this page</div>
					)
				}
			/>
			<Route
				path='/UsersListAdmin'
				element={
					current_user_type === User_Types.Admin_User ? (
						<AdminElement>
							<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
								<UsersListAdmin />
							</Layout>
						</AdminElement>
					) : (
						<div>You don't have access to this page</div>
					)
				}
			/>

			<Route path='/signup' element={<SignUp />} />
			<Route
				path='/todolistuser'
				element={
					current_user_type === User_Types.Admin_User || current_user_type === User_Types.Normal_User ? (
						<UserElement>
							<Layout isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}>
								<ToDoListUser />
							</Layout>
						</UserElement>
					) : (
						<Navigate to='/todolistuser' />
					)
				}
			/>
		</Routes>
	)
}

function PublicElement({ children }) {
	return <>{children}</>
}

function UserElement({ children }) {
	if (current_user_type === User_Types.Admin_User || current_user_type === User_Types.Normal_User) {
		return <>{children}</>
	} else {
		return <Navigate to={'/todolistuser'} />
	}
}

function AdminElement({ children }) {
	if (current_user_type === User_Types.Admin_User) {
		return <>{children}</>
	} else {
		return <div> You dont have acces to this page</div>
	}
}

export default App
