import React from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ImMagicWand } from "react-icons/im";

const LeftPanelManual: React.FC<{
  bombCount: number;
  setBombCount: (val: number) => void;
  betAmount: number;
  setBetAmount: (val: number) => void;
  gameStatus: string;
  startGame: () => void;
  revealRandomTile: () => void;
  handleCashout: () => void;
  firstTileRevealed: boolean;
  gemsRemaining: number;
  profitMultiplier: number;
  betError: string;
  parseInputToNumber: (val: string) => number;
}> = ({
  bombCount,
  setBombCount,
  betAmount,
  setBetAmount,
  gameStatus,
  startGame,
  revealRandomTile,
  handleCashout,
  firstTileRevealed,
  gemsRemaining,
  profitMultiplier,
  betError,
  parseInputToNumber,
}) => {
  const payoutAmount = +(betAmount * profitMultiplier).toFixed(2);
  const profitAmount = +(betAmount * (profitMultiplier - 1)).toFixed(2);

  const quickAmounts = [10, 100, 1000, 10000];

  return (
    <aside className="w-full h-full flex flex-col  ">
      {/* Amount Input */}
      <div className="mb-[5px]">
        <div className="text-sm text-gray-300 mb-1  font-semibold flex items-center gap-x-1">Amount <AiOutlineInfoCircle color="#1aa964" /></div>
        <label className="flex gap-1 bg-[#292D2e] items-center border border-transparent  rounded-lg pl-2 pr-0.5 py-[3.25px] focus-within:border-green-400  transition-colors ">
          <div>🇮🇳</div>

          <input
            type="number"
            value={betAmount === 0 ? "" : betAmount}
            placeholder="0"
            onChange={(e) => setBetAmount(parseInputToNumber(e.target.value))}
            className="w-full bg-transparent px-1  text-sm border-none outline-none placeholder:text-white"
            disabled={gameStatus === "playing"}
          />

          <button
            onClick={() => setBetAmount(Math.max(0, Math.floor(betAmount / 2)))}
            className="px-4 inline-block pypx-4-1 bg-[#3a4142] h-8 text-white rounded font-medium text-sm"
            disabled={gameStatus === "playing"}
          >
            1/2
          </button>

          <button
            onClick={() => setBetAmount(betAmount * 2)}
            className="px-4 py-1 font-medium h-8 bg-[#3a4142] text-white rounded text-sm"
            disabled={gameStatus === "playing"}
          >
            2x
          </button>
           <button
            onClick={() => setBetAmount(betAmount * 2)}
            className="px-4 py-1 bg-[#3a4142] h-8 text-white rounded text-sm flex flex-col items-center justify-center"
            disabled={gameStatus === "playing"}
          >
            <FaChevronUp size={12} />
            <FaChevronDown size={12} />

          </button>
        </label>

        {betError && <p className="text-red-400 text-xs mt-1">{betError}</p>}
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex gap-2 text-sm  text-[#848788] mb-[6px] rounded-sm">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            className="flex-1 bg-[#353b3c] py-2 rounded"
            onClick={() => setBetAmount(amt)}
            disabled={gameStatus === "playing"}
          >
            {amt >= 1000 ? `${amt / 1000}.0k` : amt}
          </button>
        ))}
      </div>

      {/* Mines Slider */}

      <div className="mb-4 mt-2">
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          Mines
        </label>

        <div className="bg-[#292D2e] w-full flex gap-x-4 items-center px-4 py-[7px] rounded-lg">
          <span className="text-white text-sm">{bombCount}</span>

          <input
            type="range"
            min={1}
            max={24}
            value={bombCount}
            onChange={(e) => setBombCount(Number(e.target.value))}
            className="w-full custom-range"
            style={{ "--value": bombCount } as React.CSSProperties}
            disabled={gameStatus === "playing"}
          />

          <span className="text-[#b3bec1] text-sm">24</span>
        </div>
      </div>
      {/* Game Buttons */}
      <div className="mb-4">
        {gameStatus === "idle" ? (
          <button onClick={startGame} className="bet_btn">
            Bet
          </button>
        ) : (
          <>
            <button
              onClick={revealRandomTile}
              className="w-full py-3 bg-[#3a4142] text-white text-sm flex gap-x-2 justify-center rounded-lg mb-3 hover:bg-[#424a4b]"
            >
            <ImMagicWand className="pt-0.5" /> Pick a Tile Randomly
            </button>
            <button
              onClick={handleCashout}
              disabled={!firstTileRevealed || gameStatus !== "playing"}
              className={`cashout_btn  opacity-90 font-medium ${
                !firstTileRevealed
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:opacity-100 "
              }`}
            >
              Cash out 🇮🇳 ₹{payoutAmount.toFixed(2)}
            </button>
          </>
        )}
      </div>

      {/* Stats */}
      {firstTileRevealed && (
        <div className="mt-2 mb-4 space-y-3">
          <div>
            <div className="text-sm text-gray-400">Remaining Gems</div>
            <div className="bg-[#2d3132] border border-[#e4eaf019] rounded-lg px-3 py-2">
              {gemsRemaining}
            </div>
          </div>
          <div>
            <div className="text-sm text-gray-400">
              Total profit ({profitMultiplier.toFixed(2)}x)
            </div>
            <div className="bg-[#2d3132] border border-[#e4eaf019] rounded-lg px-3 py-2">
              ₹{profitAmount.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftPanelManual;
