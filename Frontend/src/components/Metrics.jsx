import "./metrics.css";

export default function Metrics({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  return (
    <div className="metrics">
      <div className="metric-box">
        <h3>{data.total || 0}</h3>
        <p>Total Candidates</p>
      </div>
      <div className="metric-box metric-pending">
        <h3>{data.pending || 0}</h3>
        <p>Pending</p>
      </div>
      <div className="metric-box metric-reviewed">
        <h3>{data.reviewed || 0}</h3>
        <p>Reviewed</p>
      </div>
      <div className="metric-box metric-hired">
        <h3>{data.hired || 0}</h3>
        <p>Hired</p>
      </div>
    </div>
  );
}
