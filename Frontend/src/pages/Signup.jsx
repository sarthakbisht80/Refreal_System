import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import "./auth.css";

export default function Signup() {
  const [form, setForm] = useState({});

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/auth/signup", form);
    window.location.href = "/";
  };

  return (
    <form className="auth-container" onSubmit={submit}>
      <h2>Signup</h2>

      <input
        placeholder="Name"
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />

      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        required
      />

      <button>Create Account</button>

      <p className="auth-link">
        Already have an account? <Link to="/">Login</Link>
      </p>
    </form>
  );
}
