import React from "react";


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
    <aside className="w-full h-full flex flex-col">
      {/* Amount Input */}
      <div className="mb-4">
        <div className="text-sm text-gray-300 mb-1 font-semibold">Amount</div>
       <label className="flex gap-2 bg-[#292D2e] items-center border border-transparent  rounded-xl px-2 py-1 focus-within:border-green-400  transition-colors ">
  <div>🇮🇳</div>

  <input
    type="number"
    value={betAmount === 0 ? "": betAmount}
    placeholder="0"
    onChange={(e) => setBetAmount(parseInputToNumber(e.target.value))}
    className="w-full bg-transparent px-3 py-2 text-sm border-none outline-none placeholder:text-white"
    disabled={gameStatus === "playing"}
  />

  <button
    onClick={() => setBetAmount(Math.max(0, Math.floor(betAmount / 2)))}
    className="px-2 py-1 bg-gray-700 rounded text-xs"
    disabled={gameStatus === "playing"}
  >
    1/2
  </button>

  <button
    onClick={() => setBetAmount(betAmount * 2)}
    className="px-2 py-1 bg-gray-700 rounded text-xs"
    disabled={gameStatus === "playing"}
  >
    2x
  </button>
</label>

        {betError && <p className="text-red-400 text-xs mt-1">{betError}</p>}
      </div>

      {/* Quick Amount Buttons */}
      <div className="flex gap-2 text-xs text-gray-400 mb-3">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            className="flex-1 bg-gray-700/60 py-2 rounded"
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
        <div className="bg-[#292D2e] w-full flex gap-x-2 items-center px-2 py-3 rounded-xl">
          <span>{bombCount}</span>
          <input
            type="range"
            min={1}
            max={24}
            value={bombCount}
            onChange={(e) => setBombCount(Number(e.target.value))}
            className="w-full accent-green-400"
            disabled={gameStatus === "playing"}

          />
          <span>24</span>
        </div>
      </div>

      {/* Game Buttons */}
      <div className="mb-4">
        {gameStatus === "idle" ? (
          <button
            onClick={startGame}
            className="w-full py-3 bg-gradient-to-r from-green-400 to-green-300 text-gray-900 font-semibold rounded-lg mb-3"
          >
            Bet
          </button>
        ) : (
          <>
            <button
              onClick={revealRandomTile}
              className="w-full py-3 bg-gray-700 text-gray-200 font-semibold rounded-lg mb-3 hover:bg-gray-600"
            >
              🪄 Pick a Tile Randomly
            </button>
            <button
              onClick={handleCashout}
              disabled={!firstTileRevealed || gameStatus !== "playing"}
              className={`w-full py-3 bg-yellow-400 text-gray-900 font-bold rounded-lg mb-3 ${
                !firstTileRevealed ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-300"
              }`}
            >
              Cash out 🇮🇳₹{payoutAmount.toFixed(2)}
            </button>
          </>
        )}
      </div>

      {/* Stats */}
      {firstTileRevealed && (
        <div className="mt-2 mb-4 space-y-3">
          <div>
            <div className="text-sm text-gray-400">Remaining Gems</div>
            <div className="bg-gray-900 border border-gray-700 rounded px-3 py-2">{gemsRemaining}</div>
          </div>
          <div>
            <div className="text-sm text-gray-400">Total profit ({profitMultiplier.toFixed(2)}x)</div>
            <div className="bg-[#292D2e] border border-gray-700 rounded px-3 py-2">
              ₹{profitAmount.toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default LeftPanelManual;