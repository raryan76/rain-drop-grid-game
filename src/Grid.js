import React, { useEffect, useState } from 'react';
import './Grid.css';

const darkColors = ['#1a1aff', '#ff1a1a', '#1a75ff', '#ff751a'];

const Grid = ({ rows, columns }) => {
  const [grid, setGrid] = useState([]);
  const [drops, setDrops] = useState([]);

  useEffect(() => {
    const newGrid = [];
    for (let i = 0; i < rows; i++) {
      const row = [];
      for (let j = 0; j < columns; j++) {
        row.push({ id: `${i}-${j}` });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, [rows, columns]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDrops(prevDrops => {
        const newDrops = prevDrops.map(drop => ({
          ...drop,
          row: drop.row + 1,
        })).filter(drop => drop.row < rows);

        if (Math.random() > 0.7) {
          const col = Math.floor(Math.random() * columns);
          const color = darkColors[Math.floor(Math.random() * darkColors.length)];
          const size = Math.floor(Math.random() * 4) + 1;
          const shape = getRandomShape();
          const consecutiveCells = Math.floor(Math.random() * 5) + 1;
          const rowStart = -consecutiveCells;
          for (let i = rowStart; i < 0; i++) {
            newDrops.push({ row: i, col, color, size, shape });
          }
        }

        return newDrops;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [rows, columns]);

  const getRandomShape = () => {
    const shapes = ['circle', 'square', 'triangle'];
    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map(cell => {
            const drop = drops.find(drop => drop.row === rowIndex && drop.col === parseInt(cell.id.split('-')[1]));
            return (
              <div
                key={cell.id}
                className={`cell ${drop ? 'drop' : ''} ${drop ? drop.shape : ''} size-${drop ? drop.size : ''}`}
                style={{
                  backgroundColor: drop ? drop.color : 'transparent',
                }}
              ></div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
