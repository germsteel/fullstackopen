import React, { useState } from 'react';
import ReactDOM from 'react-dom';

interface ButtonProps {
  handleClick: () => void;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
] as const;

interface AppProps {
  anecdotes: readonly string[];
}

const App: React.FC<AppProps> = ({ anecdotes }) => {
  const [selected, setSelected] = useState<number>(0);
  const [points, setPoints] = useState<number[]>(new Array(anecdotes.length).fill(0));
  const [mostVoted, setMostVoted] = useState<number>(0);

  const handleSelectedClick = (): void => {
    setSelected(Math.floor(Math.random() * anecdotes.length));
  };

  const handleVoteClick = (): void => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
    
    if (newPoints[selected] > newPoints[mostVoted]) {
      setMostVoted(selected);
    }
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} points</p>
      <Button handleClick={handleSelectedClick} text="next anecdote" />
      <Button handleClick={handleVoteClick} text="vote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted]}</p>
    </div>
  );
};

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
); 