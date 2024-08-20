import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import SignupPage from "./pages/SignupPage"
import DashboardPage from "./pages/DashboardPage"
import ContactPage from "./pages/ContactPage"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./components/ContactCard"
import "./assets/styles/index.css"
import "./styles/global.css"

function App() {
	return (
		<Router>
			<Header />
			<main className="container">
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/signup" element={<SignupPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/contacts/:id" element={<ContactPage />} />
				</Routes>
			</main>
			<Footer />
		</Router>
	)
}

export default App
