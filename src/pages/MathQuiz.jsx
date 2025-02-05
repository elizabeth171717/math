import { useState } from "react";

const MathQuiz = () => {
  const [question, setQuestion] = useState(generateQuestion());
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState("");

  function generateQuestion() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    return { num1, num2, correctAnswer: num1 + num2 };
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(answer) === question.correctAnswer) {
      setScore(score + 1);
      setMessage("✅ Correct!");
    } else {
      setMessage(`❌ Wrong! The correct answer is ${question.correctAnswer}`);
    }
    setAnswer("");
    setQuestion(generateQuestion());
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Math Quiz</h2>
      <h3>
        What is {question.num1} + {question.num2}?
      </h3>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
        />
        <button type="submit">Check Answer</button>
      </form>
      <h3>{message}</h3>
      <h4>Score: {score}</h4>
    </div>
  );
};

export default MathQuiz;
