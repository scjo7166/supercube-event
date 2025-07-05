import React, { useState } from "react";
import './index.css';

const codes = new Set(["QmJkT", "ZlYEr", "PoRgS", "nJvQa", "CxqPe", "AHtKs", "gDeHy", "bYKmW", "RxLno", "uVzQC"]);

function App() {
  const [code, setCode] = useState("");
  const [usedCodes, setUsedCodes] = useState(new Set());
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState("");

  const handleSpin = () => {
    if (!codes.has(code)) {
      alert("유효하지 않은 인증코드입니다.");
      return;
    }
    if (usedCodes.has(code)) {
      alert("이미 사용된 인증코드입니다.");
      return;
    }

    const isWin = Math.random() < 0.05;
    const segmentAngle = 360 / 20;
    const index = isWin ? Math.floor(Math.random() * 4) : Math.floor(Math.random() * 16 + 4);
    const newAngle = 3600 + index * segmentAngle;

    setSpinning(true);
    setAngle(prev => prev + newAngle);
    setTimeout(() => {
      setSpinning(false);
      setResult(isWin ? "🎉 보상 당첨!" : "꽝입니다 😢");
      setUsedCodes(prev => new Set(prev).add(code));
    }, 4000);
  };

  return (
    <div className="container">
      <h1>🎯 수퍼큐브 이벤트</h1>
      <div className="pointer" />
      <div className="wheel" style={{ transform: \`rotate(\${angle}deg)\` }}>
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="segment"
            style={{
              transform: \`rotate(\${i * 18}deg) skewY(-72deg)\`,
              background: i < 4 ? '#3498db' : '#f1c40f'
            }}
          >
            {i < 4 ? "보상" : "꽝"}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="인증코드 입력"
        value={code}
        onChange={e => setCode(e.target.value)}
      />
      <button onClick={handleSpin} disabled={spinning}>뽑기</button>
      {result && <div className="result">{result}</div>}
    </div>
  );
}

export default App;