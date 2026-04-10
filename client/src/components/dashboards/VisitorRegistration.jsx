import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PURPOSES = ["Consultation", "Follow-up", "Lab test", "Pharmacy", "Surgery prep", "Emergency", "Other"];

export default function VisitorRegistration() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", phone: "", purpose: "", patientName: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim())         e.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone)) e.phone = "Enter a valid 10-digit number";
    if (!form.purpose)              e.purpose = "Select a purpose";
    if (!form.patientName.trim())   e.patientName = "Patient name is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/visitors/register", form);
      navigate("/success", { state: { name: form.name, entryTime: res.data.entryTime } });
    } catch (err) {
      alert("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, id, children, error }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <h1 className="text-xl font-medium text-slate-900">Visitor registration</h1>
          <p className="text-sm text-slate-500 mt-1">Please fill in the details below</p>
        </div>

        <Field label="Full name" error={errors.name}>
          <input
            className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors ${errors.name ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500"}`}
            placeholder="Enter your full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </Field>

        <Field label="Phone number" error={errors.phone}>
          <input
            type="tel" maxLength={10}
            className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors ${errors.phone ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500"}`}
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
          />
        </Field>

        <Field label="Purpose of visit" error={errors.purpose}>
          <select
            className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors appearance-none bg-white ${errors.purpose ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500"}`}
            value={form.purpose}
            onChange={(e) => setForm({ ...form, purpose: e.target.value })}
          >
            <option value="">Select purpose</option>
            {PURPOSES.map((p) => <option key={p}>{p}</option>)}
          </select>
        </Field>

        <Field label="Patient / Doctor name" error={errors.patientName}>
          <input
            className={`w-full h-11 px-4 rounded-xl border text-sm outline-none transition-colors ${errors.patientName ? "border-red-400 bg-red-50" : "border-slate-200 focus:border-blue-500"}`}
            placeholder="Enter patient or doctor name"
            value={form.patientName}
            onChange={(e) => setForm({ ...form, patientName: e.target.value })}
          />
        </Field>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm rounded-xl transition-colors mt-2 flex items-center justify-center gap-2"
        >
          {loading ? (
            <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Registering...</>
          ) : "Register visit"}
        </button>
      </div>
    </div>
  );
}