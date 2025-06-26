export default function FeedbackList({ feedbacks }) {
  if (!feedbacks.length) return <p>No feedback yet.</p>;

  return (
    <ul>
      {feedbacks.map((fb) => (
        <li key={fb.id}>
          <p><strong>To:</strong> {fb.employee_id}</p>
          <p><strong>Strengths:</strong> {fb.strengths}</p>
          <p><strong>Areas to Improve:</strong> {fb.areas_to_improve}</p>
          <p><strong>Sentiment:</strong> {fb.sentiment}</p>
          <hr />
        </li>
      ))}
    </ul>
  );
}
