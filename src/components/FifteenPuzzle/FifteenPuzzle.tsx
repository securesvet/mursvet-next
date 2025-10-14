"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";

type Tile = number; // 0 represents the empty slot

const GRID_SIZE = 4;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

function indexToPos(index: number) {
  return { row: Math.floor(index / GRID_SIZE), col: index % GRID_SIZE };
}

function areAdjacent(i1: number, i2: number) {
  const p1 = indexToPos(i1);
  const p2 = indexToPos(i2);
  const dr = Math.abs(p1.row - p2.row);
  const dc = Math.abs(p1.col - p2.col);
  return (dr === 1 && dc === 0) || (dr === 0 && dc === 1);
}

function solvedBoard(): Tile[] {
  return Array.from({ length: TILE_COUNT }, (_, i) =>
    i + 1 === TILE_COUNT ? 0 : i + 1,
  );
}

// Make a shuffle by applying legal random moves from solved state — guarantees solvable
function shuffleBoard(moves = 200): Tile[] {
  const board = solvedBoard();
  let emptyIdx = board.indexOf(0);
  for (let i = 0; i < moves; i++) {
    const neighbors: number[] = [];
    for (let j = 0; j < TILE_COUNT; j++)
      if (areAdjacent(j, emptyIdx)) neighbors.push(j);
    const choice = neighbors[Math.floor(Math.random() * neighbors.length)];
    [board[emptyIdx], board[choice]] = [board[choice], board[emptyIdx]];
    emptyIdx = choice;
  }
  return board;
}

function useTileDrag(id: string) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });
  return { attributes, listeners, setNodeRef, transform, isDragging };
}

export const FifteenPuzzle: React.FC = () => {
  const [board, setBoard] = useState<Tile[]>(() => solvedBoard());
  const [moves, setMoves] = useState(0);
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const isSolved = useMemo(
    () => board.every((v, i) => (i + 1 === TILE_COUNT ? v === 0 : v === i + 1)),
    [board],
  );

  const startNewGame = useCallback(() => {
    setIsShuffling(true);
    setStartedAt(Date.now());
    setMoves(0);
    setTimeout(() => {
      setBoard(shuffleBoard(250));
      setIsShuffling(false);
    }, 0);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = Number(active.id);
      const overId = Number(over.id);

      if (overId === 0) {
        const fromIdx = board.findIndex((v) => v === activeId);
        const toIdx = board.findIndex((v) => v === 0);
        if (fromIdx === -1 || toIdx === -1) return;
        if (!areAdjacent(fromIdx, toIdx)) return;

        const newBoard = [...board];
        [newBoard[fromIdx], newBoard[toIdx]] = [
          newBoard[toIdx],
          newBoard[fromIdx],
        ];
        setBoard(newBoard);
        setMoves((m) => m + 1);
        if (startedAt === null) setStartedAt(Date.now());
      }
    },
    [board, startedAt],
  );

  // Small Tile component
  const TileView: React.FC<{ value: Tile; index: number }> = ({
    value,
    index,
  }) => {
    const id = String(value);
    const { attributes, listeners, setNodeRef, transform, isDragging } =
      useTileDrag(id);

    const style: React.CSSProperties = {
      touchAction: "none",
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      transition: isDragging ? "none" : undefined,
      zIndex: isDragging ? 10 : 1,
    };

    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        id={`tile-${value}`}
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center text-xl md:text-2xl font-medium rounded-2xl shadow-sm select-none transition-transform duration-150 ${
          value === 0 ? "bg-transparent" : "bg-white"
        }`}
        style={style}
        data-index={index}
      >
        {value !== 0 ? value : null}
      </div>
    );
  };

  // Droppable cell
  const Cell: React.FC<{ idx: number; children?: React.ReactNode }> = ({
    idx,
    children,
  }) => {
    const value = board[idx];
    const { setNodeRef, isOver } = useDroppable({
      id: String(value), // "0" for empty cell
    });

    return (
      <div
        ref={setNodeRef}
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl
          select-none transform transition-all duration-150 border
          ${value === 0 ? "bg-gray-100 border-dashed border-gray-300" : "border-transparent"}
          ${isOver ? "ring-2 ring-blue-400" : ""}
        `}
      >
        {children}
      </div>
    );
  };

  const cells = (
    <div
      className="grid grid-cols-4 gap-3 touch-none"
      style={{
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        userSelect: "none",
      }}
    >
      {board.map((value, idx) => (
        <Cell key={idx} idx={idx}>
          {value !== 0 ? <TileView value={value} index={idx} /> : null}
        </Cell>
      ))}
    </div>
  );

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Fifteen Puzzle</h2>
        <div className="flex gap-2">
          <button
            className="px-3 py-1 rounded-lg bg-blue-600 text-white text-sm"
            onClick={startNewGame}
            disabled={isShuffling}
          >
            {isShuffling ? "Shuffling..." : "Shuffle"}
          </button>
          <button
            className="px-3 py-1 rounded-lg bg-gray-200 text-sm"
            onClick={() => {
              setBoard(solvedBoard());
              setMoves(0);
              setStartedAt(null);
            }}
          >
            Reset
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        {cells}
      </DndContext>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <div>
          Moves: <strong className="text-black">{moves}</strong>
        </div>
        <div>
          {isSolved ? (
            <span className="text-green-600 font-semibold">Solved!</span>
          ) : null}
        </div>
      </div>

      <div className="mt-3 text-xs text-gray-500">
        Tip: Drag a tile onto the empty space. Tiles only move into the empty
        space when they are adjacent.
      </div>
    </div>
  );
};

export default FifteenPuzzle;
