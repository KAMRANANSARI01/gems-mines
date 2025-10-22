import React, { useState } from "react";
import { BiInfoSquare } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
// import { Info } from "lucide-react";

interface LeftPanelAutomaticProps {
  bombCount: number;
  setBombCount: (count: number) => void;
  betAmount: number;
  setBetAmount: (amount: number) => void;
  gameStatus: string;
  startGame: () => void;
  revealRandomTile: () => void;
  handleCashout: () => void;
  firstTileRevealed: boolean;
  gemsRemaining: number;
  profitMultiplier: number;
  betError: string;
  parseInputToNumber: (value: string) => number;
}

const LeftPanelAutomatic: React.FC<LeftPanelAutomaticProps> = ({
  bombCount,
  setBombCount,
  betAmount,
  setBetAmount,
  startGame,
  betError,
}) => {
  const [numBets, setNumBets] = useState<number | "∞">("∞");
  const [onWinAction, setOnWinAction] = useState<"reset" | "increase">("reset");
  const [onWinValue, setOnWinValue] = useState(0);
  const [onLossAction, setOnLossAction] = useState<"reset" | "increase">(
    "reset"
  );
  const [onLossValue, setOnLossValue] = useState(0);

  return (
    <div
      className="space-y-5 animate-fadeIn"
      style={{ animation: "fadeIn 0.4s ease" }}
    >
      {/* Amount Section */}
      <div>
        <label className="flex items-center gap-2 text-gray-300 text-sm font-semibold mb-1">
          {/* Amount <Info size={14} className="text-gray-400" /> */}
        </label>

        <label className="flex gap-2 bg-[#292D2e] items-center border border-transparent  rounded-xl px-2 py-1 focus-within:border-green-400  transition-colors">
          <div>🇮🇳</div>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => setBetAmount(Number(e.target.value))}
            className="bg-transparent px-3 py-2 outline-none w-full text-white text-sm"
          />
          <button
            onClick={() => setBetAmount(betAmount / 2)}
            className="px-2 py-1 bg-[#292D2e] rounded text-xs hover:bg-gray-700"
          >
            ½
          </button>
          <button
            onClick={() => setBetAmount(betAmount * 2)}
            className="px-2 py-1 bg-[#292D2e] rounded text-xs hover:bg-gray-700"
          >
            2×
          </button>
        </label>

        {betError && <p className="text-red-400 text-xs mt-1">{betError}</p>}
      </div>

      {/* Mines Section */}
      <div>
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          Mines
        </label>
        <div className="bg-[#292D2e] w-full flex gap-x-2 items-center px-2 py-3 rounded-xl">
          <span>{bombCount}</span>
          <input
            type="range"
            min={1}
            max={24}
            value={bombCount}
            onChange={(e) => setBombCount(Number(e.target.value))}
            className="w-full accent-green-400"
          />
          <span>24</span>
        </div>
      </div>

      {/* Number of Bets */}
      <div>
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          Number of Bets
        </label>
        <label className="flex gap-2 bg-[#292D2e] items-center border border-transparent  rounded-xl px-2 py-1 focus-within:border-green-400  transition-colors">
          <input
            type="number"
            className="bg-transparent px-3 py-2 outline-none w-full text-white text-sm"
          />
          {["∞", 10, 100].map((val) => (
            <button
              key={val}
              onClick={() => setNumBets(val as number | "∞")}
              className={`flex-1 py-2 px-2 rounded-md border text-sm ${
                numBets === val
                  ? "bg-green-500/20 border-green-400 text-green-300"
                  : "bg-[#292D2e] border-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {val}
            </button>
          ))}
        </label>
      </div>

      {/* On Win */}
      <div>
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          On win
        </label>
        <div className="flex items-center gap-2">
          <div className="w-full  flex gap-x-2 bg-[#292D2e] p-1 rounded-xl">
            <button
              onClick={() => setOnWinAction("reset")}
              className={`py-2 px-2 rounded-md text-sm font-medium ${
                onWinAction === "reset" ? "bg-gray-600 text-white" : ""
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => setOnWinAction("increase")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onWinAction === "increase" ? "bg-gray-600 text-white" : ""
              }`}
            >
              Increase by
            </button>
          </div>
          <label className="flex gap-2 bg-[#292D2e] items-center border border-transparent  rounded-xl px-2 py-1 focus-within:border-green-400  transition-colors ">
            <input
              type="number"
              value={onWinValue}
              onChange={(e) => setOnWinValue(Number(e.target.value))}
              className="w-full bg-transparent px-3 py-2 text-sm border-none outline-none placeholder:text-white"
            />
            <span className="text-white text-sm font-medium">%</span>
          </label>
        </div>
      </div>

      {/* On Loss */}
      <div>
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          On loss
        </label>
        <div className="flex items-center gap-2">
          <div className="w-full  flex gap-x-2 bg-[#292D2e] p-1 rounded-xl">
            <button
              onClick={() => setOnLossAction("reset")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onLossAction === "reset" ? "bg-gray-600 text-white" : ""
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => setOnLossAction("increase")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onLossAction === "increase" ? "bg-gray-600 text-white" : ""
              }`}
            >
              Increase by
            </button>
          </div>
          <label className="flex gap-2 bg-[#292D2e] items-center border border-transparent  rounded-xl px-2 py-1 focus-within:border-green-400  transition-colors ">
            <input
              type="number"
              value={onLossValue}
              onChange={(e) => setOnLossValue(Number(e.target.value))}
              className="w-full bg-transparent px-3 py-2 text-sm border-none outline-none placeholder:text-white"
            />
            <span className="text-white font-medium text-sm">%</span>
          </label>
        </div>
      </div>
    <div className="flex gap-x-2 text-sm">

      <span><BsQuestionCircle size={22} /></span>
      Use of script is optional and players must take full responsibility for any attendant risks. We will not be held liable in this regard.
    </div>
      {/* Start Button */}
      <div className="lg:sticky -bottom-5 bg-[#323738] py-2 lg:py-5  ">
        <button
          onClick={startGame}
          disabled={true}
          className="w-full bg-gradient-to-r text-sm from-green-600 to-green-400 text-black font-semibold py-3 rounded-xl mt-4 transition hover:opacity-90 cursor-not-allowed"
        >
          Start Auto Bet
        </button>
        <button className="mt-2 flex items-center gap-x-2 justify-center py-1 rounded-xl bg-[#24ee891a] text-white font-semibold text-sm w-full">
          <span>
            <BiInfoSquare size={20} />
          </span>{" "}
          Betting with 0 will enter demo mode.
        </button>
      </div>
    </div>
  );
};

export default LeftPanelAutomatic;
