import { useState } from 'react';

export default function FeedbackForm({ team, onSubmit }) {
  const [employeeId, setEmployeeId] = useState('');
  const [strengths, setStrengths] = useState('');
  const [areasToImprove, setAreasToImprove] = useState('');
  const [sentiment, setSentiment] = useState('neutral');

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      employee_id: parseInt(employeeId),
      strengths,
      areas_to_improve: areasToImprove,
      sentiment
    });

    setStrengths('');
    setAreasToImprove('');
    setSentiment('neutral');
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} required>
        <option value="">Select Employee</option>
        {team.map((emp) => (
          <option key={emp.id} value={emp.id}>
            {emp.email}
          </option>
        ))}
      </select><br /><br />

      <textarea
        placeholder="Strengths"
        value={strengths}
        onChange={(e) => setStrengths(e.target.value)}
        required
      /><br /><br />

      <textarea
        placeholder="Areas to Improve"
        value={areasToImprove}
        onChange={(e) => setAreasToImprove(e.target.value)}
        required
      /><br /><br />

      <select value={sentiment} onChange={(e) => setSentiment(e.target.value)}>
        <option value="positive">Positive</option>
        <option value="neutral">Neutral</option>
        <option value="negative">Negative</option>
      </select><br /><br />

      <button type="submit">Submit Feedback</button>
    </form>
  );
}
