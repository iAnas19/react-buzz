import { useState } from "react";
import reactLogo from "./assets/react.svg";

import "./app.css";
import { useToaster } from "./components/Toaster";

function App() {
  const [count, setCount] = useState(0);

  const addToast = useToaster();
  const handleSuccess = () => {
    setCount((count) => count + 1);
    addToast(`Count increased  Successfully`, "success");
  };
  const handleError = () => {
    addToast(`Something went wrong`, "error");
  };
  const handleInfo = () => {
    addToast(`Count is ${count + 1}`, "info");
  };
  const handleWarning = () => {
    addToast(`Count is ${count - 1}`, "warning");
  };

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>
      <h1>React Buzz</h1>
      <div className="description">
        <div className="card">
          <button onClick={handleSuccess}>Success</button>
          <button onClick={handleError}>Error</button>
          <button onClick={handleInfo}>Info</button>
          <button onClick={handleWarning}>Warning</button>
        </div>
        <p>
          A lightweight, customizable toaster notification component for React
          featuring drag-to-dismiss, auto-expiration, grouped/stacked
          appearance, and pop-in/pop-out animations.
        </p>
      </div>
    </>
  );
}

export default App;
