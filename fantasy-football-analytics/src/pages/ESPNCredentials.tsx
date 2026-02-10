import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../services/supabase'

export default function ESPNCredentials() {
  const [espnS2, setEspnS2] = useState('')
  const [swid, setSwid] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!espnS2.trim() || !swid.trim()) {
      setError('Please fill in both ESPN cookie fields.')
      return
    }

    if (!user) {
      setError('You must be logged in to save credentials.')
      return
    }

    setLoading(true)
    const { error } = await supabase
      .from('users')
      .upsert({
        id: user.id,
        espn_s2: espnS2.trim(),
        swid: swid.trim(),
        email: user.email,
      })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-white mb-2 text-center">
          ESPN Credentials
        </h2>
        <p className="text-gray-400 text-center text-sm mb-6">
          Connect your ESPN Fantasy Football account
        </p>

        <div className="bg-gray-700/50 border border-gray-600 rounded p-4 mb-6">
          <h3 className="text-sm font-semibold text-blue-400 mb-2">
            How to find your ESPN cookies:
          </h3>
          <ol className="text-sm text-gray-300 space-y-1 list-decimal list-inside">
            <li>Log into ESPN Fantasy Football in your browser</li>
            <li>Open Developer Tools (F12)</li>
            <li>Go to Application &rarr; Cookies &rarr; espn.com</li>
            <li>Copy the values for <code className="bg-gray-600 px-1 rounded text-blue-300">espn_s2</code> and <code className="bg-gray-600 px-1 rounded text-blue-300">SWID</code></li>
          </ol>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="espn_s2" className="block text-sm font-medium text-gray-300 mb-1">
              espn_s2
            </label>
            <input
              id="espn_s2"
              type="text"
              value={espnS2}
              onChange={(e) => setEspnS2(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 font-mono text-sm"
              placeholder="Paste your espn_s2 cookie value"
            />
          </div>

          <div>
            <label htmlFor="swid" className="block text-sm font-medium text-gray-300 mb-1">
              SWID
            </label>
            <input
              id="swid"
              type="text"
              value={swid}
              onChange={(e) => setSwid(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 font-mono text-sm"
              placeholder="{XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX}"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 disabled:bg-green-800 disabled:cursor-not-allowed text-white font-medium rounded transition-colors"
          >
            {loading ? 'Saving...' : 'Save ESPN Credentials'}
          </button>
        </form>
      </div>
    </div>
  )
}
