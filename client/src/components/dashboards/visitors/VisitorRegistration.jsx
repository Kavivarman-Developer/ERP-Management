import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../../../utils/toast";


const PURPOSES = [
  "Consultation",
  "Follow-up",
  "Lab test",
  "Pharmacy",
  "Surgery prep",
  "Emergency",
  "Other",
];

export default function VisitorRegistration() {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; // ✅ backend URL
  axios.defaults.headers.common['ngrok-skip-browser-warning'] = 'true'; // ✅

  const [form, setForm] = useState({
    name: "",
    phone: "",
    purpose: "",
  });

  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1=form, 2=otp
  const [otp, setOtp] = useState("");
  

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!/^\d{10}$/.test(form.phone))
      e.phone = "Enter a valid 10-digit number";
    if (!form.purpose) e.purpose = "Select a purpose";

    return Object.keys(e).length === 0;
  };

  // 🔹 STEP 1 → SEND OTP
  const sendOtp = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(`${API}/api/otp/send-otp`, {
        phone: form.phone,
      });

     showToast("OTP sent successfully ✅");
      setStep(2);
    } catch (err) {
      showToast("Failed to send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 STEP 2 → VERIFY + SAVE
  const verifyAndSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API}/api/otp/verify-otp`, {
        phone: form.phone,
        otp,
      });

      if (res.data.success) {
        const save = await axios.post(`${API}/api/visitor`, form);

        navigate("/success", {
          state: {
            name: form.name,
            entryTime: save.data.checkInTime,
          },
        });
      } else {
        showToast("Invalid OTP ❌");
      }
    } catch (err) {
      showToast("Verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center mb-3">
            <svg
              className="w-7 h-7 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <h1 className="text-xl font-medium text-slate-900">
            Visitor Registration
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please fill in the details
          </p>
        </div>

        {/* STEP 1 → FORM */}
        {step === 1 && (
          <>
            
              <input
                className="w-full h-11 px-4 rounded-xl border text-sm border-slate-200 focus:border-blue-500 mb-5"
                placeholder="Enter your name"
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
              <input
                type="tel"
                maxLength={10}
                className="w-full h-11 px-4 rounded-xl border text-sm border-slate-200 focus:border-blue-500 mb-5"
                placeholder="10-digit number"
                value={form.phone}
                onChange={(e) =>
                  setForm({
                    ...form,
                    phone: e.target.value,
                  })
                }
              />
              <select
                className="w-full h-11 px-4 rounded-xl border text-sm border-slate-200 focus:border-blue-500 mb-5"
                value={form.purpose}
                onChange={(e) =>
                  setForm({ ...form, purpose: e.target.value })
                }
              >
                <option value="">Select purpose</option>
                {PURPOSES.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            
          </>
        )}

        {/* STEP 2 → OTP */}
        {step === 2 && (
        
            <input
              className="w-full h-11 px-4 rounded-xl border text-sm border-slate-200 focus:border-blue-500"
              placeholder="Enter 6-digit OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
        )}

        {/* BUTTON */}
        <button
          onClick={step === 1 ? sendOtp : verifyAndSubmit}
          disabled={loading}
          className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mt-2"
        >
          {loading
            ? "Loading..."
            : step === 1
            ? "Send OTP"
            : "Verify & Register"}
        </button>
      </div>
    </div>
  );
}