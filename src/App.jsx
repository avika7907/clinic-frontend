import React, { useEffect, useState } from 'react'
import PatientDashboard from './components/PatientDashboard.jsx'
import PatientForm from './components/PatientForm.jsx'

const API_BASE = import.meta.env.VITE_API_BASE

function App() {
  const [view, setView] = useState('dashboard') // 'dashboard' | 'form'
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchPatients = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(API_BASE)
      if (!res.ok) {
        throw new Error('Failed to fetch patients')
      }
      const data = await res.json()
      setPatients(data)
    } catch (err) {
      setError(err.message || 'Error loading patients')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPatients()
  }, [])

  const handleAddClick = () => {
    setView('form')
  }

  const handleShowBoard = () => {
    setView('dashboard')
  }

  const handlePatientCreated = (newPatient) => {
    setPatients((prev) => [...prev, newPatient])
    setView('dashboard')
  }

  const handleDeletePatient = async (id) => {
    const confirmDelete = window.confirm('Delete this patient record?')
    if (!confirmDelete) return

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (!res.ok) {
        throw new Error('Failed to delete patient')
      }
      setPatients((prev) => prev.filter((p) => p._id !== id))
    } catch (err) {
      alert(err.message || 'Error deleting patient')
    }
  }

  return (
    <div className="app-container">
      {view === 'dashboard' ? (
        <PatientDashboard
          patients={patients}
          loading={loading}
          error={error}
          onAddNew={handleAddClick}
          onDelete={handleDeletePatient}
        />
      ) : (
        <PatientForm
          onShowBoard={handleShowBoard}
          onPatientCreated={handlePatientCreated}
        />
      )}
    </div>
  )
}

export default App
