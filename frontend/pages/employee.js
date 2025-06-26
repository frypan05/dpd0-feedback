import { useEffect, useState } from "react";
import axios from "../utils/api";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clock, MessageSquare, TrendingUp } from "lucide-react";

export default function EmployeePage() {
  const [feedbacks, setFeedbacks] = useState([]);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    axios.get("/feedback/me").then((res) => setFeedbacks(res.data));
  }, [token]);

  const acknowledgeFeedback = async (id) => {
    try {
      await axios.post(`/feedback/${id}/acknowledge`);
      setFeedbacks((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, is_acknowledged: true } : f
        )
      );
    } catch (err) {
      alert("Failed to acknowledge feedback");
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case "positive":
        return "text-green-600";
      case "negative":
        return "text-red-600";
      default:
        return "text-yellow-600";
    }
  };

  const unacknowledgedCount = feedbacks.filter((f) => !f.is_acknowledged).length;
  const positiveCount = feedbacks.filter((f) => f.sentiment === "positive").length;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar field="Employee" unacknowledgedCount={unacknowledgedCount} />

      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.length}</div>
              <p className="text-xs text-slate-600">Received so far</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Unacknowledged</CardTitle>
              <Clock className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {unacknowledgedCount}
              </div>
              <p className="text-xs text-slate-600">Pending your response</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Positive Feedback</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {Math.round((positiveCount / feedbacks.length) * 100) || 0}%
              </div>
              <p className="text-xs text-slate-600">Positive sentiment</p>
            </CardContent>
          </Card>
        </div>

        {/* Feedback cards */}
        <div className="space-y-6">
          {feedbacks.map((f) => (
            <Card key={f.id}>
              <CardHeader>
                <CardTitle className={getSentimentColor(f.sentiment)}>
                  {f.sentiment.charAt(0).toUpperCase() + f.sentiment.slice(1)}
                </CardTitle>
                <CardDescription>
                  Received on {new Date(f.timestamp).toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>
                  <strong>Strengths:</strong> {f.strengths}
                </p>
                <p>
                  <strong>Improvements:</strong> {f.areas_to_improve}
                </p>
                {!f.is_acknowledged ? (
                  <button
                    onClick={() => acknowledgeFeedback(f.id)}
                    className="mt-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Acknowledge
                  </button>
                ) : (
                  <span className="text-green-600 font-medium">✅ Acknowledged</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
