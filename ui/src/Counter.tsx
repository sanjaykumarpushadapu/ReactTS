import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement } from './store';
import { RootState } from './store';

const Counter: React.FC = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: RootState) => state.counter.value);

  return (
    <div>
      <h1>Counter: {value}</h1>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;