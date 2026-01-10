import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import "./refer.css";

export default function ReferCandidate() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    jobTitle: ""
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", form.name);
      data.append("email", form.email);
      data.append("phone", form.phone);
      data.append("jobTitle", form.jobTitle);
      
      if (file) {
        data.append("resume", file);
      }

      await api.post("/candidates", data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to refer candidate. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="refer-container">
      <h2>Refer a Candidate</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input 
            id="name"
            type="text"
            placeholder="Enter candidate name"
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input 
            id="email"
            type="email"
            placeholder="Enter candidate email"
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone *</label>
          <input 
            id="phone"
            type="tel"
            placeholder="Enter candidate phone"
            value={form.phone}
            onChange={e => setForm({...form, phone: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jobTitle">Job Title *</label>
          <input 
            id="jobTitle"
            type="text"
            placeholder="Enter job title"
            value={form.jobTitle}
            onChange={e => setForm({...form, jobTitle: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume (PDF)</label>
          <input 
            id="resume"
            type="file" 
            accept=".pdf" 
            onChange={e => setFile(e.target.files[0])}
          />
          {file && <p className="file-name">Selected: {file.name}</p>}
        </div>

        <div className="form-actions">
          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <Link to="/dashboard" className="btn-cancel">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
