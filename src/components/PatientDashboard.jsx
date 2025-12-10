import React from 'react'
import PatientCard from './PatientCard.jsx'

function PatientDashboard({ patients, loading, error, onAddNew, onDelete }) {
  return (
    <div className="page">
      <header className="page-header">
        <h1 className="title">Clinic Daily Board</h1>
        <button className="primary-btn" onClick={onAddNew}>
          + Add New Patient
        </button>
      </header>

      <hr className="divider" />

      {loading && <p className="info-text">Loading patients...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && patients.length === 0 && (
        <p className="info-text">No patients yet. Click &ldquo;Add New Patient&rdquo; to create one.</p>
      )}

      <div className="card-grid">
        {patients.map((patient) => (
          <PatientCard key={patient._id} patient={patient} onDelete={onDelete} />
        ))}
      </div>
    </div>
  )
}

export default PatientDashboard
