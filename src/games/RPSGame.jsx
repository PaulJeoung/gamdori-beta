import React, { useState } from "react";
import rockImg from "../assets/rock.png";
import paperImg from "../assets/paper.png";
import scissorImg from "../assets/scissor.png";

const choices = [
    {name:"rock", img: rockImg},
    {name:"paper", img: paperImg},
    {name:"scissor", img: scissorImg}
];

export default function RPSGame() {
    const [result, setResult] = useState(null);
    const [userChoice, setUserChoice] = useState(null);
    const [cpuChoice, setCpuChoice] = useState(null);

    const play = (choice) => {
        const cpu = choices[Math.floor(Math.random()*3)];
        setUserChoice(choice);
        setCpuChoice(cpu);

        if(choice.name === cpu.name) setResult("무승부");
        else if(
            (choice.name==="rock" && cpu.name==="scissor") ||
            (choice.name==="paper" && cpu.name==="rock") ||
            (choice.name==="scissor" && cpu.name==="paper")
        ) setResult("승리");
        else setResult("패배");
    };

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className="text-xl font-bold mb-2">가위바위보</h2>
            <div className="flex gap-4 mb-2">
                {choices.map(c => (
                    <button key={c.name} onClick={()=>play(c)} className="w-16 h-16">
                        <img src={c.img} alt={c.name}/>
                    </button>
                ))}
            </div>
            {userChoice && cpuChoice && (
                <div className="text-center mt-2">
                    <div>내 선택: <img src={userChoice.img} alt={userChoice.name} className="inline w-8 h-8"/></div>
                    <div>컴퓨터 선택: <img src={cpuChoice.img} alt={cpuChoice.name} className="inline w-8 h-8"/></div>
                    <div className="mt-1 font-bold text-lg">{result}</div>
                </div>
            )}
        </div>
    );
}
