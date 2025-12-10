import React, { useState } from 'react'

const API_BASE = import.meta.env.VITE_API_BASE

function PatientForm({ onShowBoard, onPatientCreated }) {
  const [patientName, setPatientName] = useState('')
  const [doctorAssigned, setDoctorAssigned] = useState('')
  const [diagnosis, setDiagnosis] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!patientName.trim() || !doctorAssigned.trim()) {
      setError('Patient name and Assigned doctor are required.')
      return
    }

    setSubmitting(true)
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          patientName,
          doctorAssigned,
          diagnosis,
        }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || 'Failed to create patient')
      }

      const created = await res.json()
      onPatientCreated(created)

      setPatientName('')
      setDoctorAssigned('')
      setDiagnosis('')
    } catch (err) {
      setError(err.message || 'Error submitting form')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <button className="secondary-btn" onClick={onShowBoard}>
          Show Patient Board
        </button>
        <div className="form-header-text">
          <h1 className="title">Patient Intake</h1>
          <p className="subtitle">Create new patient record</p>
        </div>
      </header>

      <form className="form" onSubmit={handleSubmit}>
        {error && <p className="error-text">{error}</p>}

        <input
          type="text"
          className="input"
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
        />

        <input
          type="text"
          className="input"
          placeholder="Assigned Doctor"
          value={doctorAssigned}
          onChange={(e) => setDoctorAssigned(e.target.value)}
        />

        <textarea
          className="input textarea"
          placeholder="Diagnosis / Notes"
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          rows={4}
        />

        <button className="primary-btn full-width" type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Record'}
        </button>
      </form>
    </div>
  )
}

export default PatientForm
