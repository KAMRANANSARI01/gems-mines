import React, { useMemo, useState } from "react";
import LeftPanelManual from "./LeftPanelManual";
import LeftPanelAutomatic from "./LeftPanelAutomatic";
import RightBoard from "./RightBoard";
import { useBombDiamondGame } from "./helper/useBombDiamondGame";
import { PiSpeakerLowFill } from "react-icons/pi";
import { FaStar, FaHeart, FaTelegramPlane, FaMusic } from "react-icons/fa";
import {
  MdOutlineShowChart,
} from "react-icons/md";
import { LuKeyboard} from "react-icons/lu";
import { GiAcorn } from "react-icons/gi";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BiMovie } from "react-icons/bi";
import { FiMaximize } from "react-icons/fi";

const BombDiamondGame: React.FC = () => {
  const {
    bombCount,
    setBombCount,
    boxes,
    revealed,
    gameStatus,
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

  const [activeTab, setActiveTab] = useState<"manual" | "auto">("manual"); //  tab state

  const totalBoxes = 25;
  const displayBoxes = useMemo(
    () => (boxes.length ? boxes : Array(totalBoxes).fill("diamond")),
    [boxes]
  );

  const payoutAmount = +(betAmount * profitMultiplier).toFixed(2);
  // const profitAmount = +(betAmount * (profitMultiplier - 1)).toFixed(2);

  return (
    <div className=" bg-[#232626] text-white p-2 sm:p-6 lg:h-screen">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row">
        {/* LEFT PANEL with Tabs */}
        <div className="w-full mb-5 lg:hidden">
               <RightBoard
            boxes={displayBoxes}
            revealed={revealed}
            gameStatus={gameStatus}
            clickedIndices={clickedIndices}
            handleReveal={handleReveal}
            history={history}
            showCashoutPopup={showCashoutPopup}
            profitMultiplier={profitMultiplier}
            payoutAmount={payoutAmount}
            showPopup
          />
        </div>
        <aside className="w-full  mb-0 lg:max-w-[360px] left_part_scroll bg-[#323738] rounded-xl lg:rounded-none lg:rounded-tl-xl  shadow-lg flex flex-col">
          {/* Tab Header */}
          <div className="w-full hidden lg:flex">
            <button
              className={`flex-1 py-3 text-center font-semibold  transition-all ${
                activeTab === "manual"
                  ? " text-green-400 gradient-border-box "
                  : " text-gray-400 hover:text-white border-b border-[#e4eaf019]"
              }`}
              onClick={() => setActiveTab("manual")}
            >
              Manual
            </button>
            <button
              className={`flex-1 py-3 text-center font-semibold transition-all ${
                activeTab === "auto"
                  ? " text-green-400 gradient-border-box"
                  : " text-gray-400 hover:text-white border-b border-[#e4eaf019]"
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
        <div className="w-full hidden lg:block">
          <RightBoard
            boxes={displayBoxes}
            revealed={revealed}
            gameStatus={gameStatus}
            clickedIndices={clickedIndices}
            handleReveal={handleReveal}
            history={history}
            showCashoutPopup={showCashoutPopup}
            profitMultiplier={profitMultiplier}
            payoutAmount={payoutAmount}
            showPopup
          />
        </div>
        <div className="flex lg:hidden">
          <button
            className={`flex-1 py-3 text-center font-semibold  transition-all ${
              activeTab === "manual"
                ? " text-green-400 gradient-border-box "
                : " text-gray-400 hover:text-white border-b border-[#e4eaf019]"
            }`}
            onClick={() => setActiveTab("manual")}
          >
            Manual
          </button>
          <button
            className={`flex-1 py-3 text-center font-semibold transition-all ${
              activeTab === "auto"
                ? " text-green-400 gradient-border-box"
                : " text-gray-400 hover:text-white border-b border-[#e4eaf019]"
            }`}
            onClick={() => setActiveTab("auto")}
          >
            Auto
          </button>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto bg-[#26292B] flex items-center rounded-br-xl rounded-bl-xl justify-between px-4 py-4 border-t border-[#e4eaf019] text-gray-300 text-sm">
        {/* Left Section */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <FaStar className="text-[#8FA0B3] md:text-[22px]" />
            <span>638</span>
          </div>
          <div className="flex items-center gap-2">
            <FaHeart className="text-[#8FA0B3] md:text-[22px]" />
            <span>648</span>
          </div>
          <FaTelegramPlane className="text-[#8FA0B3] md:text-[22px]" />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-5">
          <BiMovie className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <FiMaximize className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <FaMusic className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <PiSpeakerLowFill className="text-green-400 md:text-[22px] cursor-pointer" />
          <LuKeyboard className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <MdOutlineShowChart className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <GiAcorn className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
          <AiOutlineQuestionCircle className="text-[#8FA0B3] md:text-[22px] cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default BombDiamondGame;
