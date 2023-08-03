
import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import quizData from '../quizData';
import music1 from '../music/2.mp3';
import music2 from '../music/1.mp3';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);

  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Audio(); // Create a new Audio object
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setCorrectCount(correctCount + 1);
      musicRef.current.src = music1; // Set the source for music1
    } else {
      setWrongCount(wrongCount + 1);
      musicRef.current.src = music2; // Set the source for music2
    }

    musicRef.current.play(); // Play the background music

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      setSelectedAnswer('');

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedAnswer('');

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleBackQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    setSelectedAnswer('');

    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setCorrectCount(0);
    setWrongCount(0);
  };

  const calculateGrade = () => {
    const percentage = (score / quizData.length) * 100;

    if (percentage >= 90) {
      return 'Grade-1';
    } else if (percentage >= 75) {
      return 'Grade-2';
    } else if (percentage >= 50) {
      return 'Grade-3';
    } else {
      return 'Grade-Verylow';
    }
  };

  return (
  
    <div className="quiz-container">
       <div className='slag'>Check Brain:Grade?</div>
      <div className="score-board">
       
        <div className="score">
          Score: {score}
        </div>
      </div>
      {!showScore ? (
        <div className="question-board">
          <div className="question">
            {quizData[currentQuestion].question}
          </div>
          <div className="answer-options">
            {quizData[currentQuestion].answers.map((answer, index) => {
              const isCorrect = answer === quizData[currentQuestion].correctAnswer;
              const isSelected = answer === selectedAnswer;
              let btnClass = 'answer-btn';

              if (isSelected) {
                btnClass += isCorrect ? ' green' : ' red';
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isSelected}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="counting-chart">
            <div className="correct-count">
              Correct: {correctCount}
            </div>
            <div className="wrong-count">
              Wrong: {wrongCount}
            </div>
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button className="back-btn" onClick={handleBackQuestion}>
                Back
              </button>
            )}
            <button className="next-btn" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <div className="result">Your score: {score} / {quizData.length}</div>
          <div className="grade">Grade: {calculateGrade()}</div>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
      <audio ref={musicRef} style={{ display: 'none' }} /> 
    </div>
  );
};

export default Quiz;





/*
import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import quizData from '../quizData';
import music1 from '../music/2.mp3';
import music2 from '../music/1.mp3';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const musicRef = useRef(null);

   useEffect(() => {
    musicRef.current = new Audio(); // Create a new Audio object
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      musicRef.current.src = music1; // Set the source for music1
    } else {
      musicRef.current.src = music2; // Set the source for music2
    }

    musicRef.current.play(); // Play the background music

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      setSelectedAnswer('');

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedAnswer('');

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleBackQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    setSelectedAnswer('');

    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  const calculateGrade = () => {
    const percentage = (score / quizData.length) * 100;

    if (percentage >= 90) {
      return 'Grade-1';
    } else if (percentage >= 75) {
      return 'Grade-2';
    } else if (percentage >= 50) {
      return 'Grade-3';
    } else {
      return 'Grade-Verylow';
    }
  };

  return (
    <div className="quiz-container">
      <div className="score-board">
        <div className="score">
          Score: {score}
        </div>
      </div>
      {!showScore ? (
        <div className="question-board">
          <div className="question">
            {quizData[currentQuestion].question}
          </div>
          <div className="answer-options">
            {quizData[currentQuestion].answers.map((answer, index) => {
              const isCorrect = answer === quizData[currentQuestion].correctAnswer;
              const isSelected = answer === selectedAnswer;
              let btnClass = 'answer-btn';

              if (isSelected) {
                btnClass += isCorrect ? ' green' : ' red';
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isSelected}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button className="back-btn" onClick={handleBackQuestion}>
                Back
              </button>
            )}
            <button className="next-btn" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <div className="result">Your score: {score} / {quizData.length}</div>
          <div className="grade">Grade: {calculateGrade()}</div>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
      <div className="counting-chart">
        <div className="correct-count">
          Correct: {score}
        </div>
        <div className="wrong-count">
          Wrong: {quizData.length - score}
        </div>
      </div>
      <audio ref={musicRef} style={{ display: 'none' }} /> 
    </div>
  );
};

export default Quiz;



/*
import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import quizData from '../quizData';
import music1 from '../music/2.mp3';
import music2 from '../music/1.mp3';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Audio(); // Create a new Audio object
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      musicRef.current.src = music1; // Set the source for music1
    } else {
      musicRef.current.src = music2; // Set the source for music2
    }

    musicRef.current.play(); // Play the background music

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      setSelectedAnswer('');

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedAnswer('');

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleBackQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    setSelectedAnswer('');

    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      <div className="score-board">
        <div className="score">
          Score: {score}
        </div>
      </div>
      {!showScore ? (
        <div className="question-board">
          <div className="question">
            {quizData[currentQuestion].question}
          </div>
          <div className="answer-options">
            {quizData[currentQuestion].answers.map((answer, index) => {
              const isCorrect = answer === quizData[currentQuestion].correctAnswer;
              const isSelected = answer === selectedAnswer;
              let btnClass = 'answer-btn';

              if (isSelected) {
                btnClass += isCorrect ? ' green' : ' red';
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isSelected}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button className="back-btn" onClick={handleBackQuestion}>
                Back
              </button>
            )}
            <button className="next-btn" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <div className="result">Your score: {score} / {quizData.length}</div>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
      <div className="counting-chart">
        <div className="correct-count">
          Correct: {score}
        </div>
        <div className="wrong-count">
          Wrong: {currentQuestion - score}
        </div>
      </div>
      <audio ref={musicRef} style={{ display: 'none' }} /> 
    </div>
  );
};

export default Quiz;







/*import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import quizData from '../quizData';
import music1 from '../music/2.mp3';
import music2 from '../music/1.mp3';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const musicRef = useRef(null);

  useEffect(() => {
    musicRef.current = new Audio(); // Create a new Audio object
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);

    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1);
      musicRef.current.src = music1; // Set the source for music1
    } else {
      musicRef.current.src = music2; // Set the source for music2
    }

    musicRef.current.play(); // Play the background music

    setTimeout(() => {
      const nextQuestion = currentQuestion + 1;
      setSelectedAnswer('');

      if (nextQuestion < quizData.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

 
  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    setSelectedAnswer('');

    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleBackQuestion = () => {
    const prevQuestion = currentQuestion - 1;
    setSelectedAnswer('');

    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="quiz-container">
      {!showScore ? (
        <div className="question-container">
          <div className="question">
            {quizData[currentQuestion].question}
            <span className="score-count">Score: {score} / {currentQuestion + 1}</span>
          </div>
          <div className="answer-options">
            {quizData[currentQuestion].answers.map((answer, index) => {
              const isCorrect = answer === quizData[currentQuestion].correctAnswer;
              const isSelected = answer === selectedAnswer;
              let btnClass = 'answer-btn';

              if (isSelected) {
                btnClass += isCorrect ? ' green' : ' red';
              }

              return (
                <button
                  key={index}
                  className={btnClass}
                  onClick={() => handleAnswerClick(answer)}
                  disabled={isSelected}
                >
                  {answer}
                </button>
              );
            })}
          </div>
          <div className="navigation-buttons">
            {currentQuestion > 0 && (
              <button className="back-btn" onClick={handleBackQuestion}>
                Back
              </button>
            )}
            <button className="next-btn" onClick={handleNextQuestion}>
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="result-container">
          <div className="result">Your score: {score} / {quizData.length}</div>
          <button className="reset-btn" onClick={resetQuiz}>
            Restart Quiz
          </button>
        </div>
      )}
      <audio ref={musicRef} style={{ display: 'none' }} /> 
    </div>
  );
};

export default Quiz;
*/