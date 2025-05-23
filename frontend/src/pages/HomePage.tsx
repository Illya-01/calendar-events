import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Calendar Events</h1>
          <p className="text-xl mb-8">
            Plan your events, stay organized, and never miss an important date again.
          </p>

          <div className="flex justify-center space-x-4">
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn btn-secondary">
              Register
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Manage Events</h3>
              <p className="text-gray-600">
                Create, edit, and delete events with ease. Add details like time,
                importance, and descriptions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Filter Events</h3>
              <p className="text-gray-600">
                Filter events by importance, search by keywords, and browse by date
                ranges.
              </p>
            </div>

            <div className="p-6 bg-white rounded-lg shadow">
              <h3 className="text-xl font-semibold mb-3">Secure Access</h3>
              <p className="text-gray-600">
                Your events are private and secure. Only you can access your personal
                calendar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
