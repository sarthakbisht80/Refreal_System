import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";
import CandidateCard from "../components/CandidateCard";
import Metrics from "../components/Metrics";
import { AuthContext } from "../context/AuthContext";
import "./dashboard.css";

export default function Dashboard() {
  const [candidates, setCandidates] = useState([]);
  const [search, setSearch] = useState("");
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get("/candidates");
      const stats = await api.get("/candidates/metrics");
      setCandidates(res.data);
      setMetrics(stats.data || {});
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        logout();
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const filtered = candidates.filter(c =>
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.jobTitle?.toLowerCase().includes(search.toLowerCase()) ||
    c.status?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="dashboard"><div className="loading">Loading...</div></div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Candidate Dashboard</h2>
        <div className="header-actions">
          <Link to="/refer" className="btn-primary">Refer Candidate</Link>
          <button onClick={handleLogout} className="btn-secondary">Logout</button>
        </div>
      </div>
      
      <Metrics data={metrics} />
      
      <div className="search-container">
        <input 
          className="search-box"
          placeholder="Search by name, job title, or status..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          {candidates.length === 0 ? (
            <p>No candidates yet. <Link to="/refer">Refer your first candidate</Link></p>
          ) : (
            <p>No candidates match your search.</p>
          )}
        </div>
      ) : (
        <div className="candidate-list">
          {filtered.map(c => (
            <CandidateCard key={c._id} candidate={c} refresh={fetchData} />
          ))}
        </div>
      )}
    </div>
  );
}
