import { useEffect, useState } from "react";
import axios from "../utils/api";
import FeedbackForm from "../components/FeedbackForm";
import FeedbackList from "../components/FeedbackList";
import Navbar from "@/components/Navbar";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Users, MessageSquare, TrendingUp } from "lucide-react";

export default function ManagerPage() {
  const [team, setTeam] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const teamRes = await axios.get("/team");
        setTeam(teamRes.data);
        const fbRes = await axios.get("/feedback");
        setFeedbacks(fbRes.data);
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  const handleFeedbackSubmit = async (data) => {
    try {
      await axios.post("/feedback", data);
      const res = await axios.get("/feedback");
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar field="Manager" />
      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Team Members</CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{team.length}</div>
              <p className="text-xs text-slate-600">Active team members</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{feedbacks.length}</div>
              <p className="text-xs text-slate-600">Feedback given</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Sentiment</CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">Positive</div>
              <p className="text-xs text-slate-600">Team sentiment snapshot</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="submit" className="space-y-6">
          <TabsList>
            <TabsTrigger value="submit">Submit Feedback</TabsTrigger>
            <TabsTrigger value="view">Past Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="submit">
            <Card>
              <CardHeader>
                <CardTitle>Submit Feedback</CardTitle>
                <CardDescription>Choose a team member to give feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackForm team={team} onSubmit={handleFeedbackSubmit} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="view">
            <Card>
              <CardHeader>
                <CardTitle>Past Feedback</CardTitle>
                <CardDescription>See feedback you&apos;ve already submitted</CardDescription>
              </CardHeader>
              <CardContent>
                <FeedbackList feedbacks={feedbacks} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
