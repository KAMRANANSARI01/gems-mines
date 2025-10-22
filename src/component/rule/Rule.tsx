import React from "react";
import { Link } from "react-router-dom";

const Rules: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 pt-32">
      {/* Container */}
      <div className="max-w-3xl mx-auto bg-gray-800 bg-opacity-80 rounded-2xl p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-6 flex items-center gap-2">
          💣 Bomb & Diamond Game 💎 Rules
        </h1>

        <ol className="list-decimal list-inside space-y-4 text-lg text-gray-200">
          <li>
            Use the **slider** on the left side to select the number of bombs (1–24) before starting the game.
          </li>
          <li>
            Click the **Start Game** button to begin. Boxes will be covered initially.
          </li>
          <li>
            Click on any box to reveal it:
            <ul className="list-disc list-inside ml-6 mt-2">
              <li>💎 Diamond: safe! You can keep opening more boxes.</li>
              <li>💣 Bomb: game over! All boxes will be revealed.</li>
            </ul>
          </li>
          <li>
            If you reveal all diamonds without hitting a bomb, you **win** the game! 🎉
          </li>
          <li>
            After the game ends (win or lose), all boxes will automatically reveal, showing bombs and diamonds.
          </li>
     
        </ol>

        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-xl shadow-md transition-all duration-300"
          >
            ← Back to Game
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Rules;
