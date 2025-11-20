"use client";

import { Button } from "@/components/ui/button";
import { Share } from "@/components/share";
import { url } from "@/lib/metadata";

type Props = {
  animal: string;
  onRetake: () => void;
};

const animalImages: Record<string, string> = {
  cat: "/cat.png",
  dog: "/dog.png",
  fox: "/fox.png",
  hamster: "/hamster.png",
  horse: "/horse.png",
};

export default function QuizResult({ animal, onRetake }: Props) {
  const shareText = `I am a ${animal}! Take the quiz to find out yours: ${url}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-semibold">You are a {animal}!</h2>
      <img
        src={animalImages[animal]}
        alt={animal}
        width={512}
        height={512}
        className="rounded"
      />
      <Share text={shareText} />
      <Button variant="outline" onClick={onRetake}>
        Retake Quiz
      </Button>
    </div>
  );
}
