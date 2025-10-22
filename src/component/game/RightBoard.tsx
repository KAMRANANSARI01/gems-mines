import bombimg from "../../../public/bomb.webp";
import diamondimg from "../../../public/diamond.webp";
import bird from "../../../public/bg-boxskeleton.webp";
const RightBoard: React.FC<{
  boxes: ("diamond" | "bomb")[];
  revealed: boolean[];
  gameStatus: string;
  clickedIndices: number[];
  handleReveal: (i: number) => void;
  history: any[];
}> = ({
  boxes,
  revealed,
  gameStatus,
  clickedIndices,
  handleReveal,
  history,
}) => {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="right_part min-h-[calc(100vh-114px)] rounded-br-xl rounded-tr-xl  p-6 shadow-xl h-full flex flex-col w-full items-center justify-center">
        {/* History */}
        <div className="flex gap-2 overflow-x-auto w-full mb-4">
          {history.map((h) => (
            <div
              key={h.id}
              className={`flex-shrink-0 min-w-[40px] px-2 py-1 rounded-md text-xs font-medium flex items-center justify-center ${
                h.kind === "lose"
                  ? "bg-gray-700 text-gray-200"
                  : "bg-green-600 text-white"
              }`}
              title={h.kind === "lose" ? "0x" : `${h.multiplier}x`}
            >
              {h.kind === "lose" ? "0x" : `${h.multiplier}x`}
            </div>
          ))}
        </div>

        {/* Board container */}
        <div className=" bg-[#323738] rounded-xl flex justify-center items-center p-4 relative">
          <img
            className="w-full max-w-[150px] absolute top-[-31px] right-[40px] "
            src={bird}
            alt=""
          />
          <div
            className="grid gap-2"
  

            style={{
              gridTemplateColumns: "repeat(5, minmax(40px, 1fr))",
              gridTemplateRows: "repeat(5, minmax(40px, 1fr))",
            }}
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
                    ? "bg-[#444c4d]  hover:bg-[#a3b4b6]  cursor-not-allowed"
                    : "bg-[#444c4d]  hover:bg-[#a3b4b6]"
                }`}
              >
                {revealed[i] && (
                  <img
                    src={box === "bomb" ? bombimg : diamondimg}
                    alt={box}
                    className={`w-20 h-20 object-contain ${
                      clickedIndices.includes(i) ? "opacity-100" : "opacity-60"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default RightBoard;
