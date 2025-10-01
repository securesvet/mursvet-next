import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";

// FifteenPuzzle component (default export)
// - Uses dnd-kit for drag-and-drop

// - Shuffle implemented by performing many legal random moves (guaranteed solvable)
// - Tailwind CSS used for styling

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
    // swap
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

  // Derived
  const emptyIndex = board.indexOf(0);
  const isSolved = useMemo(
    () => board.every((v, i) => (i + 1 === TILE_COUNT ? v === 0 : v === i + 1)),
    [board],
  );

  useEffect(() => {
    if (isSolved && startedAt !== null) {
      // solved
    }
  }, [isSolved, startedAt]);

  const startNewGame = useCallback(() => {
    setIsShuffling(true);
    setStartedAt(Date.now());
    setMoves(0);
    // Shuffle with deterministic-ish randomness
    setTimeout(() => {
      setBoard(shuffleBoard(250));
      setIsShuffling(false);
    }, 0);
  }, []);

  // Perform swap only if over is the empty tile and adjacent
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      const activeId = Number(active.id);
      const overId = Number(over.id);
      // Only allow drop onto the empty slot (id 0) AND adjacency
      if (overId === 0) {
        // find indices
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
    // We'll make each cell a droppable area by giving it a data-over id we can read in onDragEnd
    // Since we rely on onDragEnd.over.id provided by dnd-kit, we need to create a dedicated element
    // with the droppable id set. dnd-kit picks up droppables via `data-droppable-id`/attributes set by
    // useDroppable; however, we don't want to import useDroppable directly. Instead, we emulate droppable
    // by rendering an element with `data-droppable-id` attribute — dnd-kit core detects elements by id when
    // registering sensors on draggable and droppable.

    // The simplest approach is assigning id to the cell container: the dnd-kit PointerSensor will set `over` to DOM element id
    // Only caveat: we set the id to the tile value (0 or tile number) rather than cell index so that over.id matches values.

    return (
      <div
        id={String(board[idx])}
        className={`w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-2xl select-none transform transition-all duration-150 border border-transparent ${
          board[idx] === 0 ? "bg-gray-100" : ""
        }`}
      >
        {children}
      </div>
    );
  };

  // Render grid cells; each cell either contains a tile (draggable) or empty cell (droppable by id)
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
