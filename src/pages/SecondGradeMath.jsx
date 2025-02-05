import { useState, useEffect } from "react";

const SecondGradeMathQuiz = () => {
  const [answers, setAnswers] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Example 12 math questions (addition and subtraction)
  const questions = [
    { id: 1, question: "12 + 7", correctAnswer: 19 },
    { id: 2, question: "15 - 8", correctAnswer: 7 },
    { id: 3, question: "20 + 9", correctAnswer: 29 },
    { id: 4, question: "5 + 3", correctAnswer: 8 },
    { id: 5, question: "8 - 2", correctAnswer: 6 },
    { id: 6, question: "21 + 9", correctAnswer: 30 },
    { id: 7, question: "12 + 9", correctAnswer: 21 },
    { id: 8, question: "11 - 8", correctAnswer: 3 },
    { id: 9, question: "20 + 6", correctAnswer: 26 },
    { id: 10, question: "12 + 4", correctAnswer: 16 },
    { id: 11, question: "15 - 7", correctAnswer: 8 },
    { id: 12, question: "10 + 9", correctAnswer: 19 },
    // Add more questions here
  ];

  // Initialize answers with empty values or from localStorage
  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizAnswers");
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers)); // Load saved answers from localStorage
    } else {
      // Initialize answers with empty values if no saved answers are found
      const initialAnswers = questions.map((question) => ({
        id: question.id,
        value: "", // Empty string for the answer
      }));
      setAnswers(initialAnswers);
    }
  }, []); // Empty dependency array means it runs once when the component mounts

  // Handle answer change and save to localStorage
  const handleAnswerChange = (e, id) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === id ? { ...answer, value: e.target.value } : answer
    );
    setAnswers(updatedAnswers);

    // Save answers to localStorage
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));
  };

  const handleCheckAnswers = () => {
    let correct = 0;

    answers.forEach((answer) => {
      // Ensure the comparison checks if the answer is correct
      const question = questions.find((q) => q.id === answer.id);
      if (parseInt(answer.value) === question.correctAnswer) {
        correct++;
      }
    });

    // Calculate the score as a percentage of correct answers and round to 2 decimals
    const percentage = ((correct / questions.length) * 100).toFixed(2);
    setScore(parseFloat(percentage)); // Ensure the score is stored as a number
    setSubmitted(true);
  };

  const handleSubmitAnswer = (e) => {
    e.preventDefault();
  };

  // Check if all answers are filled
  const allAnswered = answers.every((answer) => answer.value !== "");

  return (
    <div>
      <h1>Math Quiz</h1>
      <form onSubmit={handleSubmitAnswer}>
        {questions.map((question) => (
          <div key={question.id}>
            <p>{question.question}</p>
            <input
              type="text"
              value={
                answers.find((answer) => answer.id === question.id)?.value || ""
              }
              onChange={(e) => handleAnswerChange(e, question.id)} // Updated here
              placeholder="Your Answer"
            />
          </div>
        ))}

        {/* Disable the button if not all answers are provided */}
        {!submitted && (
          <button
            type="button"
            onClick={handleCheckAnswers}
            disabled={!allAnswered}
          >
            Check Answers
          </button>
        )}

        {submitted && (
          <div>
            <h3>Your Score: {score}%</h3>
            <ul>
              {questions.map((question) => (
                <li key={question.id}>
                  {question.question}:{" "}
                  {parseInt(
                    answers.find((answer) => answer.id === question.id)?.value
                  ) === question.correctAnswer
                    ? "Correct"
                    : "Wrong"}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>
    </div>
  );
};

export default SecondGradeMathQuiz;
