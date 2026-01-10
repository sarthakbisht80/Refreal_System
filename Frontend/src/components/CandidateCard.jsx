import { useState } from "react";
import api from "../api/axios";
import "./candidateCard.css";

export default function CandidateCard({ candidate, refresh }) {
  const [updating, setUpdating] = useState(false);

  const updateStatus = async (status) => {
    if (updating) return;
    setUpdating(true);
    try {
      await api.put(`/candidates/${candidate._id}/status`, { status });
      refresh();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="card">
      <h3>{candidate.name || "Unknown"}</h3>
      <div className="card-info">
        <p className="card-email">{candidate.email || "No email"}</p>
        <p className="card-phone">{candidate.phone || "No phone"}</p>
        <p className="card-title"><strong>Job Title:</strong> {candidate.jobTitle || "N/A"}</p>
        {candidate.resumeUrl && (
          <a 
            href={`http://localhost:5000/${candidate.resumeUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="resume-link"
          >
            View Resume
          </a>
        )}
      </div>
      <div className="card-status">
        <label htmlFor={`status-${candidate._id}`}>Status:</label>
        <select 
          id={`status-${candidate._id}`}
          value={candidate.status || "Pending"}
          onChange={(e) => updateStatus(e.target.value)}
          disabled={updating}
          className="status-select"
        >
          <option value="Pending">Pending</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Hired">Hired</option>
        </select>
      </div>
    </div>
  );
}
