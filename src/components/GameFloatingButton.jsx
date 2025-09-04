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
            <div className="fixed bottom-4 right-4 flex flex-col gap-3 z-50">
                <button
                    className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-full w-16 h-16 shadow-xl hover:scale-110 transition transform flex items-center justify-center text-2xl"
                    onClick={() => toggleGame("tetris")}
                    title="Tetris"
                >
                    🟦
                </button>
                <button
                    className="bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full w-16 h-16 shadow-xl hover:scale-110 transition transform flex items-center justify-center text-2xl"
                    onClick={() => toggleGame("rps")}
                    title="가위바위보"
                >
                    ✊✌️✋
                </button>
                <button
                    className="bg-gradient-to-br from-green-400 to-teal-400 text-white rounded-full w-16 h-16 shadow-xl hover:scale-110 transition transform flex items-center justify-center text-2xl"
                    onClick={() => toggleGame("galaga")}
                    title="Galaga"
                >
                    🚀
                </button>
            </div>

            {/* 게임 모달 */}
            {openGame && (
                <div className="fixed inset-0 z-50 p-4 flex justify-center items-start overflow-auto pointer-events-none">
                    <div className="pointer-events-auto w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 relative border border-white/20">
                        <button
                            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition"
                            onClick={() => setOpenGame(null)}
                        >
                            ✖
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
