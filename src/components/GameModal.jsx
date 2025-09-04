import { useState } from "react";
import Tetris from "../games/TetrisGame.jsx";
import RPSGame from "../games/RPSGame.jsx";

export default function GameModal({ onClose }) {
    const [tab, setTab] = useState("tetris");

    return (
        <div className="fixed inset-0 z-40">
            {/* 배경: 클릭하면 닫힘 */}
            <div className="absolute inset-0 bg-black/90" onClick={onClose} />

            {/* 중앙 박스: 90% 투명(요청대로) */}
            <div className="absolute inset-4 md:inset-12 flex items-center justify-center">
                <div className="w-full max-w-3xl h-[90%] bg-white/90 backdrop-blur rounded-2xl shadow-xl relative overflow-hidden">
                    <button className="absolute top-3 right-3 text-gray-600" onClick={onClose}>
                        ✖
                    </button>

                    <div className="p-4 flex items-center gap-3">
                        <button
                            onClick={() => setTab("tetris")}
                            className={`px-3 py-1 rounded ${tab === "tetris" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                        >
                            테트리스
                        </button>
                        <button
                            onClick={() => setTab("rps")}
                            className={`px-3 py-1 rounded ${tab === "rps" ? "bg-indigo-600 text-white" : "bg-gray-200"}`}
                        >
                            상자 가위바위보
                        </button>
                    </div>

                    <div className="h-[calc(100%-64px)]">
                        {tab === "tetris" ? <Tetris /> : <RPSGame />}
                    </div>
                </div>
            </div>
        </div>
    );
}
