import React, { useState, useEffect, useRef } from "react";
import "./TetrisGame.css"; // optional: 스타일 따로 분리 가능

const ROWS = 20;
const COLS = 10;
const CELL_SIZE = 25;

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
    I: "cyan",
    O: "yellow",
    T: "purple",
    S: "green",
    Z: "red",
    J: "blue",
    L: "orange",
};

function randomShape() {
    const keys = Object.keys(SHAPES);
    const key = keys[Math.floor(Math.random() * keys.length)];
    return { shape: SHAPES[key], color: COLORS[key] };
}

export default function TetrisGame() {
    const [grid, setGrid] = useState(Array.from({ length: ROWS }, () => Array(COLS).fill(null)));
    const [current, setCurrent] = useState({ ...randomShape(), x: 3, y: 0 });
    const [gameOver, setGameOver] = useState(false);
    const [score, setScore] = useState(0);

    const gameRef = useRef();

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
            setScore(score + cleared*10);
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

    // 키보드 조작
    const handleKey = (e) => {
        if(gameOver) return;
        switch(e.key){
            case "ArrowLeft": move(-1,0); break;
            case "ArrowRight": move(1,0); break;
            case "ArrowDown": move(0,1); break;
            case "ArrowUp": rotate(); break;
            case " ": hardDrop(); break;
            default: break;
        }
    };

    // 하드 드롭
    const hardDrop = () => {
        while(move(0,1)){}
        drop();
    };

    // 블록 자동 떨어뜨리기
    const drop = () => {
        if(!move(0,1)){
            merge();
            clearLines();
            const next = {...randomShape(), x:3, y:0};
            if(collide(next.shape, next.x, next.y)){
                setGameOver(true);
            } else {
                setCurrent(next);
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if(!gameOver) drop();
        }, 600);
        window.addEventListener("keydown", handleKey);
        return () => {
            clearInterval(interval);
            window.removeEventListener("keydown", handleKey);
        };
    }, [current, grid, gameOver]);

    // 렌더링 grid에 현재 블록 합치기
    const displayGrid = grid.map((row,i)=>row.map((cell,j)=>{
        if(current.shape[i-current.y]?.[j-current.x]) return current.color;
        return cell;
    }));

    return (
        <div className="flex flex-col items-center text-white">
            <h2 className="text-xl font-bold mb-2">Tetris</h2>
            <div className="grid gap-0" style={{gridTemplateColumns: `repeat(${COLS}, ${CELL_SIZE}px)`}}>
                {displayGrid.map((row,i)=> row.map((cell,j)=>(
                    <div key={`${i}-${j}`} style={{width:CELL_SIZE,height:CELL_SIZE,backgroundColor:cell || "#111", border:"1px solid #333"}}></div>
                )))}
            </div>
            <div className="mt-2">Score: {score}</div>
            {gameOver && <div className="text-red-500 text-lg font-bold mt-2">GAME OVER</div>}
        </div>
    );
}
