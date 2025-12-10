import React from 'react'

// You can swap this with a real image URL if needed
const placeholderImage =
  'https://images.pexels.com/photos/3279197/pexels-photo-3279197.jpeg?auto=compress&cs=tinysrgb&w=800'

function PatientCard({ patient, onDelete }) {
  const { _id, patientName, doctorAssigned, diagnosis } = patient

  return (
    <div className="card">
      <div className="card-image-wrapper">
        <img src={placeholderImage} alt="Doctor" className="card-image" />
        <button className="delete-btn" onClick={() => onDelete(_id)}>
          ×
        </button>
      </div>
      <div className="card-body">
        <div className="card-name">{patientName}</div>
        <div className="card-doctor">Dr. {doctorAssigned}</div>
        <p className="card-diagnosis">{diagnosis}</p>
      </div>
    </div>
  )
}

export default PatientCard
