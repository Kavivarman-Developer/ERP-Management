import { useLocation, useNavigate } from "react-router-dom";

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, entryTime } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center">
        
        <h1 className="text-2xl font-bold text-green-600 mb-3">
          ✅ Check-In Successful
        </h1>

        <p className="text-gray-600 mb-2">
          Welcome, <b>{name}</b>
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Entry Time: {entryTime ? new Date(entryTime).toLocaleString() : ""}
        </p>

        <button
          onClick={() => navigate("/visitor")}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          New Entry
        </button>
      </div>
    </div>
  );
}