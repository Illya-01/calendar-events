import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <RegisterForm />
        <p className="text-center mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-800">
            Login here
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
