import React, { useMemo, useState } from "react";
import LeftPanelManual from "./LeftPanelManual";
import LeftPanelAutomatic from "./LeftPanelAutomatic"; 
import Popup from "./Popup";
import RightBoard from "./RightBoard";
import { useBombDiamondGame } from "./helper/useBombDiamondGame";
import CashoutPopup from "./CashoutPopup";

const BombDiamondGame: React.FC = () => {
  const {
    bombCount,
    setBombCount,
    boxes,
    revealed,
    gameStatus,
    showPopup,
    betAmount,
    setBetAmount,
    gemsRemaining,
    profitMultiplier,
    firstTileRevealed,
    showCashoutPopup,
    clickedIndices,
    betError,
    history,
    startGame,
    handleReveal,
    revealRandomTile,
    handleCashout,
    parseInputToNumber,
  } = useBombDiamondGame();

  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual"); // 👈 tab state

  const totalBoxes = 25;
  const displayBoxes = useMemo(
    () => (boxes.length ? boxes : Array(totalBoxes).fill("diamond")),
    [boxes]
  );

  const payoutAmount = +(betAmount * profitMultiplier).toFixed(2);
  // const profitAmount = +(betAmount * (profitMultiplier - 1)).toFixed(2);

  return (
    <div className=" bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT PANEL with Tabs */}
        <aside className="w-full  mb-4 lg:mb-0 lg:max-w-[360px] left_part_scroll bg-[#323738] rounded-bl-xl rounded-tl-xl shadow-lg flex flex-col">
          {/* Tab Header */}
          <div className="flex">
            <button
              className={`flex-1 py-3 text-center font-semibold  transition-all ${
                activeTab === "manual"
                  ? " text-green-400 border-b-2 border-green-400"
                  : " text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("manual")}
            >
              Manual
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold transition-all ${
                activeTab === "auto"
                  ? " text-green-400 border-b-2 border-green-400"
                  : " text-gray-400 hover:text-white"
              }`}
              onClick={() => setActiveTab("auto")}
            >
              Auto
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-5 flex-1 overflow-y-auto">
            {activeTab === "manual" ? (
              <LeftPanelManual
                bombCount={bombCount}
                setBombCount={setBombCount}
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                gameStatus={gameStatus}
                startGame={startGame}
                revealRandomTile={revealRandomTile}
                handleCashout={handleCashout}
                firstTileRevealed={firstTileRevealed}
                gemsRemaining={gemsRemaining}
                profitMultiplier={profitMultiplier}
                betError={betError}
                parseInputToNumber={parseInputToNumber}
              />
            ) : (
              <LeftPanelAutomatic
                bombCount={bombCount}
                setBombCount={setBombCount}
                betAmount={betAmount}
                setBetAmount={setBetAmount}
                gameStatus={gameStatus}
                startGame={startGame}
                revealRandomTile={revealRandomTile}
                handleCashout={handleCashout}
                firstTileRevealed={firstTileRevealed}
                gemsRemaining={gemsRemaining}
                profitMultiplier={profitMultiplier}
                betError={betError}
                parseInputToNumber={parseInputToNumber}
              />
            )}
          </div>
        </aside>

        {/* RIGHT PANEL (fixed board) */}
        <RightBoard
          boxes={displayBoxes}
          revealed={revealed}
          gameStatus={gameStatus}
          clickedIndices={clickedIndices}
          handleReveal={handleReveal}
          history={history}
        />
      </div>

      {/* POPUPS */}
      {showPopup && (gameStatus === "win" || gameStatus === "lose") && (
        <Popup
          message={gameStatus === "win" ? "🎉 You Win!" : "💣 Game Over!"}
          subMessage={
            gameStatus === "win"
              ? `(${profitMultiplier.toFixed(2)}x) ₹${payoutAmount.toFixed(2)}`
              : `₹ 0.00`
          }
        />
      )}

      {showCashoutPopup && gameStatus === "cashout" && (
        <CashoutPopup
          multi={profitMultiplier.toFixed(2)}
          amount={payoutAmount.toFixed(
            2
          )}
        />
      )}
    </div>
  );
};

export default BombDiamondGame;
