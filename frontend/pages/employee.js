// pages/employee.js
import { useEffect, useState } from "react";
import axios from '../utils/api';

export default function EmployeeDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    axios.get("http://localhost:8000/feedback/me", {
      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => setFeedbacks(res.data));
  }, [token]);

  const acknowledgeFeedback = async (id) => {
    try {
      await axios.patch(`http://localhost:8000/acknowledge/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, is_acknowledged: true } : f
        )
      );
    } catch (err) {
      alert("Error acknowledging feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👩‍💻 Employee Dashboard</h1>

      {feedbacks.length === 0 ? (
        <div className="text-gray-500 text-center">No feedback received yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {feedbacks.map((f) => (
            <div
              key={f.id}
              className="bg-white rounded-2xl shadow-md p-6 border hover:shadow-lg transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-700 mb-2">📝 Feedback</h2>
              <p className="text-gray-700 mb-2"><strong>Strengths:</strong> {f.strengths}</p>
              <p className="text-gray-700 mb-2"><strong>Improvements:</strong> {f.areas_to_improve}</p>
              <p className="text-gray-700 mb-2"><strong>Sentiment:</strong> {f.sentiment}</p>
              <p className="text-sm text-gray-400 mt-2">
                Received on: {new Date(f.timestamp).toLocaleDateString()}
              </p>

              {!f.is_acknowledged && (
                <button
                  onClick={() => acknowledgeFeedback(f.id)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  Acknowledge
                </button>
              )}

              {f.is_acknowledged && (
                <span className="mt-4 inline-block text-sm text-green-600 font-medium">
                  ✅ Acknowledged
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
