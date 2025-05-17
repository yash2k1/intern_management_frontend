import { useSelector, useDispatch } from 'react-redux';
import { increment } from './counterSlice';

const Counter=()=> {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <p>{count}</p>
    </div>
  );
}
export default Counter;
