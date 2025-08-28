import { useEffect } from "react";

export default function Remaining({
  setSeconds,
  seconds,
}: {
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  seconds: number;
}) {
  useEffect(() => {
    if (seconds <= 0) return;
    const interval = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [seconds, setSeconds]);

  const minutes = (seconds / 60).toString().split(".")[0].padStart(2, "0");
  const sec = (seconds % 60).toString().padStart(2, "0");
  return (
    <span>
      Resend in {minutes}:{sec}
    </span>
  );
}
