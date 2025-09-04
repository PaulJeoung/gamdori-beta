import { useState } from "react";
import TetrisGame from "../games/TetrisGame";
import RPSGame from "../games/RPSGame";
import GalagaGame from "../games/GalagaGame";

export default function GameFloatingButton() {
    const [openGame, setOpenGame] = useState(null); // tetris/rps/galaga

    const toggleGame = (game) => {
        setOpenGame(openGame === game ? null : game);
    };

    return (
        <>
            {/* 플로팅 버튼 */}
            <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                <button
                    className="bg-blue-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-blue-600 transition"
                    onClick={() => toggleGame("tetris")}
                >
                    T
                </button>
                <button
                    className="bg-green-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-green-600 transition"
                    onClick={() => toggleGame("rps")}
                >
                    R
                </button>
                <button
                    className="bg-red-500 text-white rounded-full w-14 h-14 shadow-lg hover:bg-red-600 transition"
                    onClick={() => toggleGame("galaga")}
                >
                    G
                </button>
            </div>

            {/* 게임 모달 */}
            {openGame && (
                <div className="fixed inset-0 bg-black/70 z-40 p-4 flex justify-center items-start overflow-auto backdrop-blur-sm">
                    <div className="w-full max-w-md bg-gray-900 rounded-xl shadow-2xl p-6 relative">
                        <button
                            className="absolute top-3 right-3 text-white text-xl font-bold hover:text-gray-300"
                            onClick={() => setOpenGame(null)}
                        >
                            ×
                        </button>

                        {openGame === "tetris" && <TetrisGame />}
                        {openGame === "rps" && <RPSGame />}
                        {openGame === "galaga" && <GalagaGame />}
                    </div>
                </div>
            )}
        </>
    );
}
