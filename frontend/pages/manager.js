import { useEffect, useState } from 'react';
import axios from '../utils/api';
import FeedbackForm from '../components/FeedbackForm';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ManagerDashboard() {
  const [team, setTeam] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    const res = await axios.get('/team');
    setTeam(res.data);
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get('/feedback');
    setFeedbacks(res.data);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await axios.get('/team').then((res) => setTeam(res.data));
      } catch (err) {
        console.warn('Failed to load team:', err);
      }

      try {
        await axios.get('/feedback').then((res) => setFeedbacks(res.data));
      } catch (err) {
        console.warn('Failed to load feedbacks:', err);
      }

      setLoading(false);
    };
    init();
  }, []);

  const handleFeedbackSubmit = async (data) => {
    try {
      await axios.post('/feedback', data);
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <div className="max-w-5xl mx-auto text-black">
        <h1 className="text-3xl font-bold mb-4">Manager Dashboard</h1>
        <Separator className="mb-6" />

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Submit Feedback</h2>
            <Card className="shadow-md">
              <CardContent className="p-4">
                <FeedbackForm team={team} onSubmit={handleFeedbackSubmit} />
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Past Feedback</h2>
            <Card className="shadow-md">
              <CardContent className="p-4">
                <FeedbackList feedbacks={feedbacks} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
