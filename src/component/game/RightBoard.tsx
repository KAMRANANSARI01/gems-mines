import bombimg from "../../../public/bomb.webp";
import diamondimg from "../../../public/diamond.webp";
import bird from "../../../public/bg-boxskeleton.webp";
import CashoutPopup from "./CashoutPopup";
import Popup from "./Popup";
import star from "../../../public/star.png"
const RightBoard: React.FC<{
  boxes: ("diamond" | "bomb")[];
  revealed: boolean[];
  gameStatus: string;
  clickedIndices: number[];
  handleReveal: (i: number) => void;
  history: any[];
  profitMultiplier:any;
  showCashoutPopup:any;
  payoutAmount:any;
  showPopup?:any;

}> = ({
  boxes,
  revealed,
  gameStatus,
  clickedIndices,
  handleReveal,
  history,
  payoutAmount,
  showCashoutPopup,
  profitMultiplier,
  showPopup

}) => {
  return (
    <main className="w-full flex  justify-center relative">
      <div className="right_part lg:min-h-[calc(100vh-114px)]  rounded-xl lg:rounded-none lg:rounded-tr-xl  sm:px-6 shadow-xl h-full flex flex-col w-full items-center ">
        {/* History */}
        <div className="flex gap-2 overflow-x-auto w-full mb-3 mt-[7px] h-[40px]">
          {history.map((h) => (
            <div
              key={h.id}
              className={`flex-shrink-0  w-[80px] h-[40px] rounded-lg text-sm flex items-center justify-center ${
                h.kind === "lose"
                  ? "bg-[#4a5354] text-[#b3bec1]"
                  : "bg-[#1aa964] text-white"
              }`}
              title={h.kind === "lose" ? "0x" : `${h.multiplier}x`}
            >
              {h.kind === "lose" ? "0x" : `${h.multiplier}x`}
            </div>
          ))}
        </div>

        {/* Board container */}
        <div className="w-full lg:w-auto lg:min-h-[calc(100vh-224px)] flex items-center justify-center">
        <div className=" bg-[#323738] z-10 w-full lg:w-auto rounded-xl flex justify-center items-center p-4  md:px-2 relative">
          <img
            className="w-full max-w-[150px] absolute top-[-31px] right-[40px] "
            src={bird}
            alt=""
          />
          <div
            className="min-w-[310px] grid grid-cols-5  gap-2"
           
          >
            {boxes.map((box, i) => (
              <div
                key={i}
                onClick={() => handleReveal(i)}
                className={`w-full board-box  aspect-square rounded-lg flex items-center justify-center select-none ${
                  gameStatus === "idle"
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                } transition-transform transform shadow-md  ${
                  revealed[i]
                    ? box === "bomb"
                      ? clickedIndices.includes(i)
                        ? "bg-[#1E2121] szoom-animation"
                        : "bg-[#1E2121] opacity-40"
                      : clickedIndices.includes(i)
                      ? "bg-[#7D40CF] zoom-animation"
                      : "bg-[#7D40CF] opacity-40"
                    : gameStatus !== "playing"
                    ? "bg-[#444c4d]  hover:bg-[#545f60]  cursor-not-allowed"
                    : "bg-[#444c4d]  hover:bg-[#545f60]"
                }`}
              >
                {revealed[i] && (
                  <img
                    src={box === "bomb" ? bombimg : diamondimg}
                    alt={box}
                    className={`w-20 object-contain ${
                      clickedIndices.includes(i) ? "opacity-100" : "opacity-60"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
           {showCashoutPopup && gameStatus === "cashout" && (
        <CashoutPopup
          multi={profitMultiplier.toFixed(2)}
          amount={payoutAmount.toFixed(2)}
        />
      )}


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
        </div>
        </div>
      </div>

      <div className="absolute bottom-[100px] left-0 w-full">
             <img src={star} alt="star" className="absolute blink opacity-60  -top-[50px] left-[50px] " />
              <img src={star} alt="star" className="absolute blink  -top-[0px] left-[120px] " />
               <img src={star} alt="star" className="absolute blink opacity-60  -top-[50px] right-[50px] " />
              <img src={star} alt="star" className="absolute  blink -top-[0px] right-[120px] " />
      </div>
    </main>
  );
};

export default RightBoard;

