import React, { useState, useEffect, useRef } from "react";

const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 28;
const GAME_TIME = 90; // seconds
const FAST_THRESHOLD = 15;

const SHAPES = {
    I: [[1, 1, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[0,1,0],[1,1,1]],
    S: [[0,1,1],[1,1,0]],
    Z: [[1,1,0],[0,1,1]],
    J: [[1,0,0],[1,1,1]],
    L: [[0,0,1],[1,1,1]],
};

const COLORS = {
    I: "#00FFFF",
    O: "#FFFF00",
    T: "#A020F0",
    S: "#00FF00",
    Z: "#FF0000",
    J: "#0000FF",
    L: "#FFA500",
};

function randomShape() {
    const keys = Object.keys(SHAPES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { type: key, shape: SHAPES[key], color: COLORS[key] };
}

export default function TetrisGame() {
    const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    const [current, setCurrent] = useState({ ...randomShape(), x: 3, y: 0 });
    const [next, setNext] = useState(randomShape());
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_TIME);
    const [gameOver, setGameOver] = useState(false);
    const [highScore, setHighScore] = useState(0);

    const dropRef = useRef();

    // 충돌 체크
    const collide = (shape, x, y) => {
        for (let i = 0; i < shape.length; i++) {
            for (let j = 0; j < shape[i].length; j++) {
                if (shape[i][j]) {
                    if (y + i >= ROWS || x + j < 0 || x + j >= COLS || grid[y+i][x+j]) return true;
                }
            }
        }
        return false;
    };

    // 블록 합치기
    const merge = () => {
        const newGrid = grid.map(r => [...r]);
        current.shape.forEach((row,i) =>
            row.forEach((val,j) => { if(val) newGrid[current.y+i][current.x+j] = current.color; })
        );
        setGrid(newGrid);
    };

    // 한 줄 삭제
    const clearLines = () => {
        let newGrid = grid.filter(row => row.some(cell => !cell));
        const cleared = ROWS - newGrid.length;
        if(cleared > 0){
            setScore(prev => prev + cleared*10);
            const emptyRows = Array.from({ length: cleared }, () => Array(COLS).fill(null));
            newGrid = [...emptyRows, ...newGrid];
            setGrid(newGrid);
        }
    };

    // 블록 이동
    const move = (dx, dy) => {
        if(!collide(current.shape, current.x + dx, current.y + dy)){
            setCurrent({...current, x: current.x + dx, y: current.y + dy});
            return true;
        }
        return false;
    };

    // 블록 회전
    const rotate = () => {
        const rotated = current.shape[0].map((_,i)=> current.shape.map(row=>row[i])).map(row=>row.reverse());
        if(!collide(rotated, current.x, current.y)){
            setCurrent({...current, shape: rotated});
        }
    };

    // 하드 드롭
    const hardDrop = () => {
        while(move(0,1)){}
        drop();
    };

    // 블록 떨어뜨리기
    const drop = () => {
        if(!move(0,1)){
            merge();
            clearLines();
            const nextShape = {...next, x:3, y:0};
            if(collide(nextShape.shape, nextShape.x, nextShape.y)){
                setGameOver(true);
                setHighScore(prev => Math.max(prev, score));
            } else {
                setCurrent(nextShape);
                setNext(randomShape());
            }
        }
    };

    // 키보드 입력
    const handleKey = (e) => {
        if(gameOver) return;
        switch(e.key){
            case "ArrowLeft": e.preventDefault(); move(-1,0); break;
            case "ArrowRight": e.preventDefault(); move(1,0); break;
            case "ArrowDown": e.preventDefault(); move(0,1); break;
            case "ArrowUp": e.preventDefault(); rotate(); break;
            case " ": e.preventDefault(); hardDrop(); break;
            default: break;
        }
    };

    // 게임 루프
    useEffect(() => {
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [current, grid, gameOver]);

    useEffect(() => {
        if(gameOver) return;
        dropRef.current = setInterval(() => drop(), timeLeft <= FAST_THRESHOLD ? 400 : 600);
        return () => clearInterval(dropRef.current);
    }, [current, grid, gameOver, timeLeft]);

    // 타이머
    useEffect(() => {
        if(gameOver) return;
        if(timeLeft <= 0) { setGameOver(true); setHighScore(prev => Math.max(prev, score)); return; }
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [timeLeft, gameOver]);

    // display grid
    const displayGrid = grid.map((row,i)=> row.map((cell,j)=>{
        if(current.shape[i-current.y]?.[j-current.x]) return current.color;
        return cell;
    }));

    // 다시하기
    const restart = () => {
        setGrid(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
        setCurrent({...randomShape(), x:3, y:0});
        setNext(randomShape());
        setScore(0);
        setTimeLeft(GAME_TIME);
        setGameOver(false);
    };

    return (
        <div className="flex flex-col items-center w-full h-full text-white font-mono relative">
            {/* 상단 정보: 점수, 최고 점수, 남은 시간 */}
            <div className="flex justify-between w-full px-2 mb-2">
                <div>Score: {score}</div>
                <div>High: {highScore}</div>
                <div>Time: {timeLeft}s</div>
            </div>

            {/* 프로그래스바 */}
            <div className="w-full mb-2 h-4 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                     style={{width: `${(timeLeft/GAME_TIME)*100}%`}} />
            </div>

            {/* 게임 그리드 */}
            <div className="grid" style={{gridTemplateColumns:`repeat(${COLS}, ${CELL_SIZE}px)`, gridGap:"1px", background:"#111", padding:"2px", borderRadius:"8px"}}>
                {displayGrid.map((row,i) => row.map((cell,j) => (
                    <div key={`${i}-${j}`} style={{
                        width:CELL_SIZE,
                        height:CELL_SIZE,
                        backgroundColor: cell || "#111",
                        borderRadius:"4px",
                        transition:"background-color 0.2s"
                    }}/>
                )))}
            </div>

            {/* 다음 블록 미리보기 */}
            <div className="flex items-center gap-2 mt-3">
                <span>Next:</span>
                <div className="grid gap-1" style={{gridTemplateColumns:`repeat(${next.shape[0].length}, ${CELL_SIZE}px)`}}>
                    {next.shape.map((row,i)=>row.map((cell,j)=>(
                        <div key={`${i}-${j}`} style={{
                            width:CELL_SIZE,
                            height:CELL_SIZE,
                            backgroundColor: cell ? next.color : "#111",
                            borderRadius:"4px"
                        }}/>
                    )))}
                </div>
            </div>

            {/* 게임 오버 */}
            {gameOver && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col justify-center items-center rounded-xl">
                    <div className="text-3xl font-bold mb-4 text-red-400">GAME OVER ✖</div>
                    <button onClick={restart} className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg shadow-lg text-white hover:scale-105 transition">
                        다시하기 🔄
                    </button>
                </div>
            )}
        </div>
    );
}
