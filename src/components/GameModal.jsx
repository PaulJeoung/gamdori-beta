import { useState } from "react";
import Tetris from "../games/TetrisGame.jsx";
import RPSGame from "../games/RPSGame.jsx";
import GalagaGame from "../games/GalagaGame.jsx";

export default function GameModal({ onClose }) {
    const [tab, setTab] = useState("tetris");

    return (
        <>
            {/* 게임 박스: 화면 위에 띄우고 배경은 거의 투명 */}
            <div className="fixed inset-0 z-50 flex justify-center items-start pt-20 pointer-events-none">
                <div className="pointer-events-auto w-full max-w-md h-[90%] bg-gray-500/10 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-white/20">

                    {/* 닫기 버튼 */}
                    <button
                        className="absolute top-4 right-4 text-gray-100 text-2xl hover:text-gray-300 transition z-10"
                        onClick={onClose}
                    >
                        ✖
                    </button>

                    {/* 탭 버튼 */}
                    <div className="p-4 flex items-center gap-3 z-10">
                        <button
                            onClick={() => setTab("tetris")}
                            className={`px-4 py-2 rounded-2xl font-semibold transition ${
                                tab === "tetris"
                                    ? "bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow-lg"
                                    : "bg-white/20 text-gray-200 hover:bg-white/40"
                            }`}
                        >
                            테트리스
                        </button>
                        <button
                            onClick={() => setTab("rps")}
                            className={`px-4 py-2 rounded-2xl font-semibold transition ${
                                tab === "rps"
                                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                                    : "bg-white/20 text-gray-200 hover:bg-white/40"
                            }`}
                        >
                            가위바위보
                        </button>
                        <button
                            onClick={() => setTab("galaga")}
                            className={`px-4 py-2 rounded-2xl font-semibold transition ${
                                tab === "galaga"
                                    ? "bg-gradient-to-r from-green-400 to-teal-400 text-white shadow-lg"
                                    : "bg-white/20 text-gray-200 hover:bg-white/40"
                            }`}
                        >
                            갤러그
                        </button>
                    </div>

                    {/* 게임 영역 */}
                    <div className="flex-1 p-4 flex justify-center items-center">
                        {tab === "tetris" ? (
                            <Tetris />
                        ) : tab === "rps" ? (
                            <RPSGame />
                        ) : (
                            <GalagaGame />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
