import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <LoginForm />
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:text-blue-800">
            Register here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
