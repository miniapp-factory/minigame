"use client";

import { useState, useMemo } from "react";
import QuizResult from "./quiz-result";

type Question = {
  text: string;
  options: { text: string; animal: string }[];
};

const questions: Question[] = [
  {
    text: "What is your favorite type of food?",
    options: [
      { text: "Fish", animal: "cat" },
      { text: "Bones", animal: "dog" },
      { text: "Leaves", animal: "fox" },
      { text: "Seeds", animal: "hamster" },
      { text: "Grass", animal: "horse" },
    ],
  },
  {
    text: "Which activity do you enjoy most?",
    options: [
      { text: "Sleeping", animal: "cat" },
      { text: "Playing fetch", animal: "dog" },
      { text: "Hunting", animal: "fox" },
      { text: "Running in a wheel", animal: "hamster" },
      { text: "Riding", animal: "horse" },
    ],
  },
  {
    text: "What is your preferred environment?",
    options: [
      { text: "Indoor", animal: "cat" },
      { text: "Outdoor", animal: "dog" },
      { text: "Forest", animal: "fox" },
      { text: "Cage", animal: "hamster" },
      { text: "Pasture", animal: "horse" },
    ],
  },
  {
    text: "How do you handle stress?",
    options: [
      { text: "Curl up", animal: "cat" },
      { text: "Run around", animal: "dog" },
      { text: "Hide", animal: "fox" },
      { text: "Chew", animal: "hamster" },
      { text: "Stand tall", animal: "horse" },
    ],
  },
  {
    text: "What is your favorite sound?",
    options: [
      { text: "Purr", animal: "cat" },
      { text: "Bark", animal: "dog" },
      { text: "Howl", animal: "fox" },
      { text: "Squeak", animal: "hamster" },
      { text: "Neigh", animal: "horse" },
    ],
  },
];

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    cat: 0,
    dog: 0,
    fox: 0,
    hamster: 0,
    horse: 0,
  });
  const [finished, setFinished] = useState(false);

  const shuffledOptions = useMemo(() => {
    const opts = [...questions[current].options];
    for (let i = opts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [opts[i], opts[j]] = [opts[j], opts[i]];
    }
    return opts;
  }, [current]);

  const handleAnswer = (animal: string) => {
    setScores((prev) => ({ ...prev, [animal]: prev[animal] + 1 }));
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      setFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScores({
      cat: 0,
      dog: 0,
      fox: 0,
      hamster: 0,
      horse: 0,
    });
    setFinished(false);
  };

  if (finished) {
    const bestAnimal = Object.entries(scores).reduce((a, b) =>
      b[1] > a[1] ? b : a
    )[0];
    return <QuizResult animal={bestAnimal} onRetake={resetQuiz} />;
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">
        {questions[current].text}
      </h2>
      <div className="flex flex-col gap-2">
        {shuffledOptions.map((opt, idx) => (
          <button
            key={idx}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
            onClick={() => handleAnswer(opt.animal)}
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
