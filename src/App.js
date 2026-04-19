import React, { useState } from "react";

function App() {
  const [input, setInput] = useState({
    cuttingSpeed: "",
    feedRate: "",
    depthOfCut: "",
    temperature: ""
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const runSimulation = async () => {
    try {
      const response = await fetch(
        "https://srikari.app.n8n.cloud/webhook/cnc-tool-wear",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            cuttingSpeed: Number(input.cuttingSpeed),
            feedRate: Number(input.feedRate),
            depthOfCut: Number(input.depthOfCut),
            temperature: Number(input.temperature)
          })
        }
      );

      const data = await response.json();

      console.log("API RESPONSE:", data); // ✅ DEBUG

      setResult(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>CNC Digital Twin</h2>

      <input
        name="cuttingSpeed"
        placeholder="Cutting Speed"
        onChange={handleChange}
      />
      <br />

      <input
        name="feedRate"
        placeholder="Feed Rate"
        onChange={handleChange}
      />
      <br />

      <input
        name="depthOfCut"
        placeholder="Depth of Cut"
        onChange={handleChange}
      />
      <br />

      <input
        name="temperature"
        placeholder="Temperature"
        onChange={handleChange}
      />
      <br />
      <br />

      <button onClick={runSimulation}>Run Simulation</button>

      {result && (
        <div style={{ marginTop: 20 }}>
          <h3>Prediction</h3>

          <p>Wear: {result?.prediction?.tool_wear ?? "-"}</p>
          <p>Condition: {result?.prediction?.condition ?? "-"}</p>
          <p>Remaining Life: {result?.prediction?.remaining_life ?? "-"}</p>

          <h3>What-if</h3>
          <p>{result?.what_if?.change ?? "-"}</p>
          <p>{result?.what_if?.impact ?? "-"}</p>
        </div>
      )}
    </div>
  );
}

export default App;