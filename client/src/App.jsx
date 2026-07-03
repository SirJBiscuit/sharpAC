import { useState, useEffect } from 'react'
import { Power, Wind, Droplets, Snowflake, Sun, ChevronUp, ChevronDown, Timer, Sparkles, Lightbulb, Fan, Smartphone } from 'lucide-react'
import { checkIRSupport, transmitIR } from './utils/sharpIR'

const API_URL = import.meta.env.PROD ? '' : 'http://localhost:5004'

function App() {
  const [power, setPower] = useState(false)
  const [mode, setMode] = useState('cool')
  const [temperature, setTemperature] = useState(72)
  const [fanSpeed, setFanSpeed] = useState('auto')
  const [connected, setConnected] = useState(false)
  const [sending, setSending] = useState(false)
  const [phoneIR, setPhoneIR] = useState(null)

  useEffect(() => {
    // Check for phone IR support
    const irSupport = checkIRSupport()
    setPhoneIR(irSupport)
    console.log('IR Support:', irSupport)
    
    checkConnection()
    const interval = setInterval(checkConnection, 5000)
    return () => clearInterval(interval)
  }, [])

  const checkConnection = async () => {
    try {
      const response = await fetch(`${API_URL}/api/status`)
      const data = await response.json()
      setConnected(data.connected)
    } catch (error) {
      setConnected(false)
    }
  }

  const sendCommand = async (command) => {
    setSending(true)
    try {
      // Try phone IR first if available
      if (phoneIR && phoneIR.supported) {
        console.log('Attempting phone IR transmission...')
        const result = await transmitIR(command)
        
        if (result.success) {
          console.log(`IR sent via ${result.method}`)
          setTimeout(() => setSending(false), 300)
          return
        }
      }
      
      // Fallback to server
      const response = await fetch(`${API_URL}/api/command`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(command)
      })
      const data = await response.json()
      if (data.success) {
        console.log('Command sent to server')
      }
    } catch (error) {
      console.error('Failed to send command:', error)
    } finally {
      setTimeout(() => setSending(false), 300)
    }
  }

  const handlePower = () => {
    const newPower = !power
    setPower(newPower)
    sendCommand({ type: 'power', value: newPower })
  }

  const handleMode = (newMode) => {
    setMode(newMode)
    sendCommand({ type: 'mode', value: newMode, temperature, fanSpeed })
  }

  const handleTemperature = (delta) => {
    const newTemp = Math.max(60, Math.min(86, temperature + delta))
    setTemperature(newTemp)
    sendCommand({ type: 'temperature', value: newTemp, mode, fanSpeed })
  }

  const handleFanSpeed = (speed) => {
    setFanSpeed(speed)
    sendCommand({ type: 'fan', value: speed, mode, temperature })
  }

  const handleSpecial = (feature) => {
    sendCommand({ type: 'special', value: feature })
  }

  const modes = [
    { id: 'cool', label: 'Cool', icon: Snowflake, color: 'from-blue-500 to-cyan-500' },
    { id: 'heat', label: 'Heat', icon: Sun, color: 'from-orange-500 to-red-500' },
    { id: 'dry', label: 'Dry', icon: Droplets, color: 'from-yellow-500 to-amber-500' },
    { id: 'fan', label: 'Fan', icon: Wind, color: 'from-green-500 to-emerald-500' },
    { id: 'auto', label: 'Auto', icon: Fan, color: 'from-purple-500 to-pink-500' }
  ]

  const fanSpeeds = ['auto', 'low', 'med', 'high', 'max']

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-6 space-y-6">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">Sharp AC Remote</h1>
            <p className="text-white/70 text-sm">CV-P12LX</p>
            <div className="flex items-center justify-center gap-2">
              <div className={`w-2 h-2 rounded-full ${phoneIR?.supported || connected ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
              <span className="text-white/60 text-xs">
                {phoneIR?.supported ? (
                  <span className="flex items-center gap-1">
                    <Smartphone size={12} />
                    Phone IR Ready
                  </span>
                ) : connected ? 'Server Connected' : 'Ready'}
              </span>
            </div>
          </div>

          {/* Power Button */}
          <button
            onClick={handlePower}
            className={`w-full py-6 rounded-2xl font-bold text-xl transition-all transform active:scale-95 touch-manipulation ${
              power 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/50' 
                : 'bg-white/20 text-white/50'
            }`}
          >
            <Power className="inline-block mr-2" size={28} />
            {power ? 'ON' : 'OFF'}
          </button>

          {/* Temperature Control */}
          {power && (
            <div className="bg-white/10 rounded-2xl p-6 space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold text-white mb-2">
                  {temperature}°F
                </div>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleTemperature(-1)}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all active:scale-95 touch-manipulation"
                  >
                    <ChevronDown size={32} />
                  </button>
                  <button
                    onClick={() => handleTemperature(1)}
                    className="bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all active:scale-95 touch-manipulation"
                  >
                    <ChevronUp size={32} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Mode Selection */}
          {power && (
            <div className="space-y-3">
              <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Mode</h3>
              <div className="grid grid-cols-3 gap-3">
                {modes.map((m) => {
                  const Icon = m.icon
                  return (
                    <button
                      key={m.id}
                      onClick={() => handleMode(m.id)}
                      className={`p-4 rounded-xl transition-all transform active:scale-95 touch-manipulation ${
                        mode === m.id
                          ? `bg-gradient-to-br ${m.color} text-white shadow-lg`
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      <Icon className="mx-auto mb-1" size={24} />
                      <div className="text-xs font-medium">{m.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Fan Speed */}
          {power && (
            <div className="space-y-3">
              <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Fan Speed</h3>
              <div className="flex gap-2">
                {fanSpeeds.map((speed) => (
                  <button
                    key={speed}
                    onClick={() => handleFanSpeed(speed)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all transform active:scale-95 touch-manipulation ${
                      fanSpeed === speed
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {speed.charAt(0).toUpperCase() + speed.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Special Features */}
          {power && (
            <div className="space-y-3">
              <h3 className="text-white/80 font-semibold text-sm uppercase tracking-wide">Special Features</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleSpecial('turbo')}
                  className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all active:scale-95 touch-manipulation"
                >
                  <Sparkles className="inline-block mr-2" size={20} />
                  <span className="text-sm font-medium">Turbo</span>
                </button>
                <button
                  onClick={() => handleSpecial('plasmacluster')}
                  className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all active:scale-95 touch-manipulation"
                >
                  <Sparkles className="inline-block mr-2" size={20} />
                  <span className="text-sm font-medium">Ion</span>
                </button>
                <button
                  onClick={() => handleSpecial('swing')}
                  className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all active:scale-95 touch-manipulation"
                >
                  <Wind className="inline-block mr-2" size={20} />
                  <span className="text-sm font-medium">Swing</span>
                </button>
                <button
                  onClick={() => handleSpecial('lights')}
                  className="bg-white/10 hover:bg-white/20 text-white py-4 rounded-xl transition-all active:scale-95 touch-manipulation"
                >
                  <Lightbulb className="inline-block mr-2" size={20} />
                  <span className="text-sm font-medium">Lights</span>
                </button>
              </div>
            </div>
          )}

          {/* Sending Indicator */}
          {sending && (
            <div className="text-center text-white/60 text-sm">
              Sending command...
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/50 text-xs">
          <p>Remote Control for Sharp CV-P12LX</p>
          <p className="mt-1">remote.cloudmc.online</p>
        </div>
      </div>
    </div>
  )
}

export default App
