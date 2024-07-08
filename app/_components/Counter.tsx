"use client";

import { ReactElement, useState } from "react";

export default function Counter({ data }: { data: string }): ReactElement {
  const [count, setCount] = useState<number>(0);

  return (
    <button onClick={() => setCount((count) => count + 1)}>{count}</button>
  );
}
