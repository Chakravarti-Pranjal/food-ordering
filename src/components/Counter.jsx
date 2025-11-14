import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmt,
  reset,
} from "../redux/slices/counterSlice";

const Counter = () => {
  const [amount, setAmount] = useState(null);
  const count = useSelector((state) => state.counter.count);
  const dispatch = useDispatch();
  return (
    <div className="w-xl  text-center">
      <p className="text-2xl font-semibold mb-2">{count}</p>
      <div className="flex items-center gap-4 justify-center">
        <button
          className="border p-2 bg-amber-200 cursor-pointer rounded"
          onClick={() => dispatch(increment())}
        >
          Inc+
        </button>
        <button
          className="border p-2 bg-amber-200 cursor-pointer rounded-lg"
          onClick={() => dispatch(decrement())}
        >
          Dec-
        </button>
        <button
          className="border p-2 bg-amber-200 cursor-pointer rounded-lg"
          onClick={() => {
            setAmount(0);
            dispatch(reset());
          }}
        >
          Reset
        </button>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
          <button
            className="border p-2 bg-amber-200 cursor-pointer rounded-lg"
            onClick={() => dispatch(incrementByAmt(amount))}
          >
            Add Amount
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
