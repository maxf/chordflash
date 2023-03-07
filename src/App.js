import React, { useState } from "react";
import './App.css';
import { modifiers, chordPosition, randomChordName } from './chords.js';


const Modes = Object.freeze({
  GuessOnPiano: Symbol("Guess on piano"),
  GuessChordName: Symbol("Guess chord")
});


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
  const [ mode, setMode ] = useState(Modes.GuessOnPiano);
  const [ showingChordName, setShowingChordName ] = useState(false);
  const [ showingChordPicture, setShowingChordPicture ] = useState(false);
  const [ selectedMode, setSelectedMode ] = useState(
    [ true, true, false, false, false ] // start with only major and minor
  );
  const [ includeAccidentals, setIncludeAccidentals ] = useState(true);
  const [ chord, setChord ] =
    useState(randomChordName(selectedMode, includeAccidentals));


  function toggleModifier(event, idx) {
    setSelectedMode(s => s.map((e, i) => i===idx ? !s[i] : s[i] ));
  }

  const toggleChordName = function() {
    setShowingChordName(!showingChordName);
  }

  const toggleChordPicture = function() {
    setShowingChordPicture(!showingChordPicture);
  }

  const toggleAccidentals = function() {
    setIncludeAccidentals(!includeAccidentals);
  }

  const chordPos = chordPosition(chord);

  const nextChord = function() {
    if (!showingChordName || !showingChordPicture) {
      setShowingChordName(true);
      setShowingChordPicture(true);
    } else {
      setChord(randomChordName(selectedMode, includeAccidentals));
      switch (mode) {
        case Modes.GuessChordName:
        setShowingChordName(false);
        setShowingChordPicture(true);
        break;
        case Modes.GuessOnPiano:
        setShowingChordName(true);
        setShowingChordPicture(false);
        break;
        default:
        console.log('Error: unknown mode', mode);
        setMode(Modes.GuessOnPiano);
        setShowingChordName(true);
        setShowingChordPicture(false);
      }
    }
  };


  const pianoStyle = function() {
    if (mode === Modes.GuessChordName || showingChordPicture) {
      return {
        backgroundImage: "url('/chords.png')",
        backgroundPositionX: chordPos.left,
        backgroundPositionY: chordPos.top,
        backgroundRepeat: "no-repeat"
      }
    } else {
      return {
        background: "white"
      };
    }
  };


  const chordTitle = function() {
    switch(mode) {
    case Modes.GuessChordName:
      return (
        <h2 onClick={toggleChordName}>
          {showingChordName ? `${chord.note} ${chord.modifier}` : "Chord name?"}
        </h2>
      );
    case Modes.GuessOnPiano:
      return (
        <h1>{chord.note} {chord.modifier}</h1>
      );
    default:
      console.log('Error: unknown mode', mode);
      setMode(Modes.GuessOnPiano);
      return (
        <h1>{chord.node} {chord.modifier}</h1>
      );
    }
  };

  const pianoPicture = function() {
    switch(mode) {
    case Modes.GuessChordName:
      return (
         <div style={pianoStyle()} className="App-logo"></div>
      );
    case Modes.GuessOnPiano:
      return (
        <div
          style={pianoStyle()}
          className="App-logo"
          onClick={toggleChordPicture}></div>
      );
    default:
      console.log('Error: unknown mode', mode);
      setMode(Modes.GuessOnPiano);
      return (
        <div
          style={pianoStyle()}
          className="App-logo"
          onClick={toggleChordPicture}></div>
      );
    }
  };

  return (
    <div>
      <div className="ModeSelector">
        <div>
          Mode: {mode === Modes.GuessOnPiano ? "Guess on piano" : "Guess chord name"}
        </div>
        <button
          onClick={() => setMode(Modes.GuessOnPiano)}
          disabled={ mode === Modes.GuessOnPiano }>
          Guess piano keys
        </button>
        <button
          onClick={() => setMode(Modes.GuessChordName)}
          disabled={ mode === Modes.GuessChordName }>
          Guess chord name
        </button>
      </div>
      <div className="ModifierSelector">
        <ul>
          {modifiers.map((modifier, idx) =>
            <li key={idx}>
              {modifier}
              <input
                  type="checkbox"
                  onChange={(event) => toggleModifier(event, idx)}
                  checked={selectedMode[idx]}/>
            </li>
          )}
        </ul>
      </div>
      <div className="AccidentalsSelector">
        Include accidentals
        <input
            type="checkbox"
            onChange={toggleAccidentals}
            checked={includeAccidentals}/>
      </div>
      {pianoPicture()}
      {chordTitle()}
      <button onClick={nextChord}>Next</button>
    </div>
  );
}


export default App;
