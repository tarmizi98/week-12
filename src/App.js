import React, { useState } from 'react';
import {
  Button,
  Box,
  Container,
  Text,
  ChakraProvider,
  Center,
} from '@chakra-ui/react';

import "./App.css"

function Square({ value, onClick }) {
  const buttonColor = value === 'X' ? 'blue' : 'red';
  return (
    <Button
      variant="outline"
      size="lg"
      fontSize="8xl"
      fontWeight="bold"
      minW="80px"
      minH="80px"
      onClick={onClick}
      color={buttonColor}
    >
      {value}
    </Button>
  );
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));

  function calculateNextValue(squares) {
    return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O';
  }

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }

    const newSquares = [...squares];
    newSquares[square] = calculateNextValue(squares);
    setSquares(newSquares);
  }

  function restart() {
    setSquares(Array(9).fill(null));
  }

  function renderSquare(i) {
    return <Square value={squares[i]} onClick={() => selectSquare(i)} />;
  }

  // eslint-disable-next-line no-unused-vars
  function calculateStatus() {
    const winner = calculateWinner(squares);
    if (winner) {
      return `Winner: ${winner}`;
    } else if (squares.every(Boolean)) {
      return "Scratch: Cat's game";
    } else {
      return `Next player: ${calculateNextValue(squares)}`;
    }
  }

  // eslint-disable-next-line no-unused-vars
  return (
    <Box textAlign="center">
      <Text fontSize="2xl" fontWeight="bold" mb="4">
        {calculateStatus()}
      </Text>
      <Box display="grid" gridTemplateColumns="repeat(3, 1fr)" gap={1} p="4">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </Box>
      <Button onClick={restart} mt="4">
        Restart
      </Button>
    </Box>
  );
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return (
    <ChakraProvider>
      <Center h="100vh">
        <Container>
          <Board />
        </Container>
      </Center>
    </ChakraProvider>
  );
}

export default App;
