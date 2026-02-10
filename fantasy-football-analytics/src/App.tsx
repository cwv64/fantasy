import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ESPNCredentials from './pages/ESPNCredentials'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <span className="text-gray-400">Loading...</span>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">
          Fantasy Football Analytics
        </h1>
        <p className="text-gray-400">
          Dashboard coming soon. Your foundation is set up and ready to go.
        </p>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/espn-credentials"
        element={
          <ProtectedRoute>
            <Navbar />
            <ESPNCredentials />
          </ProtectedRoute>
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
