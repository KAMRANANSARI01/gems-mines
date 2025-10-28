import { useState, useEffect } from "react";
export type GameStatus = "idle" | "playing" | "win" | "lose" | "cashout";
export type BoxType = "bomb" | "diamond";
import clickSfx from "../.././../../public/boxclick.mp3";
import cashoutSfx from "./.././../../../public/cashout.wav";
import gameoverSfx from "./.././../../../public/gameover.wav"
import useSound from "use-sound";

export type HistoryEntry = {
  id: string;
  kind: "win" | "cashout" | "lose";
  multiplier: number;
  amount: number;
};

export const useBombDiamondGame = (totalBoxes: number = 25) => {
  const [bombCount, setBombCount] = useState<number>(4);
  const [boxes, setBoxes] = useState<BoxType[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>("idle");
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [betAmount, setBetAmount] = useState<number>(0);

  const [gemsRemaining, setGemsRemaining] = useState<number>(0);
  const [profitMultiplier, setProfitMultiplier] = useState<number>(1);
  const [firstTileRevealed, setFirstTileRevealed] = useState<boolean>(false);
  const [showCashoutPopup, setShowCashoutPopup] = useState<boolean>(false);
  const [clickedIndices, setClickedIndices] = useState<number[]>([]);
  const [betError, setBetError] = useState<string>("");
  const [history, setHistory] = useState<HistoryEntry[]>([]);


  // --- Sounds ---
const [playClick] = useSound(clickSfx, { volume: 0.5 });
const [playCashout] = useSound(cashoutSfx, { volume: 0.5 });
const [playGameOver] = useSound(gameoverSfx, { volume: 0.5 });

  // ----Helper Functions -----
  const pushHistory = (kind: HistoryEntry["kind"], multiplier: number, amount: number) => {
    const entry: HistoryEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      kind,
      multiplier,
      amount,
    };
    setHistory((prev) => [...prev, entry]);
  };

  const parseInputToNumber = (val: string) => {
    if (val === "" || val === null) return 0;
    const parsed = parseFloat(val);
    return Number.isFinite(parsed) ? parsed : 0;
  };

  // ---------------- Game Logic ----------------
  const startGame = () => {
    if (betAmount <= 0) {
      setBetError("Please enter a bet amount greater than 0.");
      return;
    }
    setBetError("");

    const bombPositions = new Set<number>();
    while (bombPositions.size < bombCount) {
      bombPositions.add(Math.floor(Math.random() * totalBoxes));
    }

    const newBoxes: BoxType[] = Array.from({ length: totalBoxes }, (_, i) =>
      bombPositions.has(i) ? "bomb" : "diamond"
    );

    setBoxes(newBoxes);
    setRevealed(Array(totalBoxes).fill(false));
    setGameStatus("playing");
    setShowPopup(false);
    setShowCashoutPopup(false);
    setGemsRemaining(totalBoxes - bombCount);
    setProfitMultiplier(1);
    setFirstTileRevealed(false);
    setClickedIndices([]);
  };

  const resetGame = () => {
    setGameStatus("idle");
    setShowPopup(false);
    setShowCashoutPopup(false);
    setGemsRemaining(0);
    setProfitMultiplier(1);
    setFirstTileRevealed(false);
    setBetAmount(0);
  };

  const handleReveal = (index: number) => {
   

    if (revealed[index] || gameStatus !== "playing") return;

    playClick();


    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    setClickedIndices((prev) => [...prev, index]);

    if (!firstTileRevealed) setFirstTileRevealed(true);

    if (boxes[index] === "bomb") {
      playGameOver();
      setGameStatus("lose");
      setShowPopup(true);
      setRevealed(Array(totalBoxes).fill(true));
      pushHistory("lose", 0, 0);
    } else {
      const safeRevealed = newRevealed.filter(
        (r, i) => r && boxes[i] === "diamond"
      ).length;
      const totalSafe = totalBoxes - bombCount;
      setGemsRemaining(totalSafe - safeRevealed);

      const baseMultiplier = totalBoxes / totalSafe;
      const newMultiplier = +(Math.pow(baseMultiplier, safeRevealed)).toFixed(2);
      setProfitMultiplier(newMultiplier);

      if (safeRevealed === totalSafe) {
        setGameStatus("win");
        setShowPopup(true);
        setRevealed(Array(totalBoxes).fill(true));
        const payout = +(betAmount * newMultiplier).toFixed(2);
        pushHistory("win", newMultiplier, payout);
      }
    }
  };

  const revealRandomTile = () => {
    if (gameStatus !== "playing") return;
        playClick();

    const unrevealedIndices = revealed
      .map((r, i) => (!r ? i : -1))
      .filter((i) => i !== -1);
    if (!unrevealedIndices.length) return;

    const randomIndex =
      unrevealedIndices[Math.floor(Math.random() * unrevealedIndices.length)];
    handleReveal(randomIndex);
  };

  const handleCashout = () => {
    if (!firstTileRevealed || gameStatus !== "playing") return;
      playCashout();

    const payout = +(betAmount * profitMultiplier).toFixed(2);
    const multi = +profitMultiplier.toFixed(2);

    setGameStatus("cashout");
    setRevealed(Array(totalBoxes).fill(true));
    setShowCashoutPopup(true);
    pushHistory("cashout", multi, payout);
  };

  useEffect(() => {
    if (gameStatus === "win" || gameStatus === "lose" || gameStatus === "cashout") {
      const timer = setTimeout(() => {
        resetGame();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [gameStatus]);

  return {
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
  };
};
