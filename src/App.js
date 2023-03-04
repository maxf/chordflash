import React, { useState } from "react";
import './App.css';
import { modifiers, chordPosition, randomChordName } from './chords.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card/>
      </header>
    </div>
  );
}


function Card() {
  const [ showingAnswer, setShowingAnswer ] = useState(false);
  const [ chord, setChord ] = useState(randomChordName());
  const [ selected, setSelected ] = useState(modifiers.map(modifier => true));

  function toggleModifier(event, idx) {
    setSelected(s => s.map((e, i) => i===idx ? !s[i] : s[i] ));
  }

  const toggleAnswer = function(event) {
    setShowingAnswer(!showingAnswer);
  }

  const chordPos = chordPosition(chord);

  const nextChord = function() {
    setChord(randomChordName(selected));
    setShowingAnswer(false);
  }

  const style = {
    backgroundImage: "url('/chords.png')",
    backgroundPositionX: chordPos.left,
    backgroundPositionY: chordPos.top,
    backgroundRepeat: "no-repeat"
  }
  return (
    <div>
    <div className="ModifierSelector">
      <ul>
        {modifiers.map((modifier, idx) =>
          <li key={idx}>
            {modifier}
            <input
                type="checkbox"
                onChange={(event) => toggleModifier(event, idx)}
                checked={selected[idx]}/>
          </li>
        )}
      </ul>
    </div>
      <div style={style} className="App-logo"></div>
      <h1 onClick={toggleAnswer}>
        {showingAnswer ? `${chord.note} ${chord.modifier}` : "Guess"}
      </h1>
      <button onClick={nextChord}>Next</button>
    </div>
  );
}


export default App;
