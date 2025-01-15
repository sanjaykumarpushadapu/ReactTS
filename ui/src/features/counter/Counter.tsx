// src/features/counter/Counter.tsx
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { increment, decrement } from './counterSlice';


const Counter: React.FC = () => {
  const dispatch = useAppDispatch();
  const value = useAppSelector((state) => state.counter.value);

  return (
    <div>
      <h1>Counter: {value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;