import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { BiInfoSquare } from "react-icons/bi";
import { BsQuestionCircle } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
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
  gameStatus,
    parseInputToNumber,

}) => {
  // @ts-ignore
  const [numBets, setNumBets] = useState<number | "∞">("∞");
  const [onWinAction, setOnWinAction] = useState<"reset" | "increase">("reset");
  const [onWinValue, setOnWinValue] = useState(0);
  const [onLossAction, setOnLossAction] = useState<"reset" | "increase">(
    "reset"
  );
  const [onLossValue, setOnLossValue] = useState(0);
  const quickAmounts = [10, 100, 1000, 10000];

  return (
    <div
      className="animate-fadeIn max-h-[calc(100vh-200px)]"
      style={{ animation: "fadeIn 0.4s ease" }}
    >
     {/* Amount Input */}
         <div >
           <div className="text-sm text-gray-300 mb-1  font-semibold flex items-center gap-x-1">Amount <AiOutlineInfoCircle color="#1aa964" /></div>
           <label className="flex gap-1 bg-[#292D2e] items-center border border-transparent   rounded-lg pl-2 pr-0.5 py-[3.25px] focus-within:border-green-400  transition-colors ">
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
         <div className="flex gap-2 text-sm  text-[#848788] mb-[6px] rounded-sm mt-1">
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
   
         <div className=" mt-3">
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

      {/* Number of Bets */}
      <div className="mt-3">
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          Number of Bets
        </label>
        <label className="flex gap-1 bg-[#292D2e] items-center border border-transparent  rounded-lg pl-2 pr-0.5 py-1 focus-within:border-green-400  transition-colors">
          <input
            type="number"
            className="bg-transparent px-3  outline-none w-full text-white text-sm"
          />
          {["∞", 10, 100].map((val) => (
            <button
              key={val}
              onClick={() => setNumBets(val as number | "∞")}
              className={` h-8 w-20 block rounded-md  text-sm bg-[#3a4142] text-white"`}
            >
              {val}
            </button>
          ))}
        </label>
      </div>

      {/* On Win */}
      <div className="mt-3">
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          On win
        </label>
        <div className="flex items-center gap-2">
          <div className="w-full  flex gap-x-2 bg-[#292D2e] p-1 rounded-xl">
            <button
              onClick={() => setOnWinAction("reset")}
              className={`py-2 px-2 rounded-md text-sm font-medium ${
                onWinAction === "reset" ? "bg-[#3a4142] text-white" : ""
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => setOnWinAction("increase")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onWinAction === "increase" ? "bg-[#3a4142] text-white" : ""
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
      <div className="mt-3">
        <label className="text-gray-300 text-sm font-semibold mb-1 block">
          On loss
        </label>
        <div className="flex items-center gap-2">
          <div className="w-full  flex gap-x-2 bg-[#292D2e] p-1 rounded-xl">
            <button
              onClick={() => setOnLossAction("reset")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onLossAction === "reset" ? "bg-[#3a4142] text-white" : ""
              }`}
            >
              Reset
            </button>
            <button
              onClick={() => setOnLossAction("increase")}
              className={`px-2 py-2 rounded-md text-sm font-medium ${
                onLossAction === "increase" ? "bg-[#3a4142] text-white" : ""
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



        <div className="mt-3" >
           <div className="text-sm text-gray-300 mb-1  font-semibold flex items-center gap-x-1">Stop on win</div>
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
   
            
   
           </label>
   
           {betError && <p className="text-red-400 text-xs mt-1">{betError}</p>}
         </div>
            <div className="mt-3" >
           <div className="text-sm text-gray-300 mb-1  font-semibold flex items-center gap-x-1">Stop on loss</div>
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
   
            
   
           </label>
   
           {betError && <p className="text-red-400 text-xs mt-1">{betError}</p>}
         </div>
    <div className="flex gap-x-2 text-sm mt-3 text-[#a1afb2]">

      <span><BsQuestionCircle size={18} /></span>
      Use of script is optional and players must take full responsibility for any attendant risks. We will not be held liable in this regard.
    </div>
      {/* Start Button */}
      <div className="lg:sticky -bottom-5 bg-[#323738] py-2 lg:py-5  ">
        <button
          onClick={startGame}
          disabled={true}
          className="bet_btn opacity-50 cursor-not-allowed"
        >
          Start Auto Bet
        </button>
        <button className="mt-1 flex items-center opacity-50 gap-x-2 justify-center py-1 rounded-lg bg-[#24ee891a] text-[#a1afb2] font-semibold text-sm w-full">
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
