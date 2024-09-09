import React, { useState } from "react";
import "./App.css";
import Modal from "./components/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSaveSegment = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="App">
      <button onClick={handleSaveSegment}>Save segment</button>
      {isModalOpen && <Modal closeModal={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
