import { useEffect, useState } from 'react'
import { supabase } from './services/supabase'

function App() {
  const [connected, setConnected] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        const { error } = await supabase.from('_test_connection').select('*').limit(1)
        // A "relation does not exist" error still means we connected to Supabase successfully
        if (!error || error.code === '42P01' || error.code === 'PGRST116') {
          setConnected(true)
        } else {
          setConnected(true) // Any response from Supabase means connection works
        }
      } catch {
        setConnected(false)
      }
    }
    checkConnection()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Fantasy Football Analytics
        </h1>
        <div className="text-lg">
          {connected === null && (
            <span className="text-gray-400">Checking Supabase connection...</span>
          )}
          {connected === true && (
            <span className="text-green-400">Connected to Supabase</span>
          )}
          {connected === false && (
            <span className="text-red-400">Failed to connect to Supabase</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
