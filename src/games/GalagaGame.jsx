import React, { useState, useEffect } from "react";

export default function GalagaGame() {
    const [playerX, setPlayerX] = useState(5);
    const [bullets, setBullets] = useState([]);
    const [enemies, setEnemies] = useState([{x:3,y:0},{x:7,y:0}]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const COLS = 10;
    const ROWS = 15;

    // 키보드 이동/발사
    useEffect(()=>{
        const handleKey = (e)=>{
            if(gameOver) return;
            if(e.key==="ArrowLeft") setPlayerX(x=>Math.max(0,x-1));
            if(e.key==="ArrowRight") setPlayerX(x=>Math.min(COLS-1,x+1));
            if(e.key===" ") setBullets(b=>[...b,{x:playerX,y:ROWS-2}]);
        };
        window.addEventListener("keydown", handleKey);
        return ()=> window.removeEventListener("keydown", handleKey);
    },[playerX, gameOver]);

    // 게임 루프
    useEffect(()=>{
        if(gameOver) return;
        const interval = setInterval(()=>{
            // 적 이동
            setEnemies(e=> e.map(en=> ({x:en.x,y:en.y+1})));
            // 총알 이동
            setBullets(b=>b.map(bl=> ({x:bl.x,y:bl.y-1})).filter(bl=>bl.y>=0));

            // 충돌 처리
            setEnemies(prev => prev.filter(en=>{
                const hit = bullets.some(bl=>bl.x===en.x && bl.y===en.y);
                if(hit) setScore(s=>s+10);
                return !hit;
            }));

            // 적이 바닥 도달 → 게임오버
            if(enemies.some(en=>en.y>=ROWS-1)) setGameOver(true);

        },300);
        return ()=> clearInterval(interval);
    },[bullets, enemies, gameOver]);

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className="text-xl font-bold mb-2">Galaga</h2>
            <div className="relative w-[250px] h-[375px] bg-black border border-gray-600">
                {/* 적 */}
                {enemies.map((en,i)=>(
                    <div key={i} style={{position:"absolute", top: en.y*25, left: en.x*25, width:25, height:25, backgroundColor:"red"}} />
                ))}
                {/* 총알 */}
                {bullets.map((bl,i)=>(
                    <div key={i} style={{position:"absolute", top: bl.y*25, left: bl.x*25+8, width:10, height:15, backgroundColor:"yellow"}}/>
                ))}
                {/* 플레이어 */}
                <div style={{position:"absolute", bottom:0, left:playerX*25, width:25, height:25, backgroundColor:"blue"}}/>
            </div>
            <div className="mt-2">Score: {score}</div>
            {gameOver && <div className="text-red-500 text-lg font-bold mt-2">GAME OVER</div>}
        </div>
    );
}
