import React, { useState, useEffect } from "react";
import { modifiers, chordPosition, randomChordName } from './chords.js';
import './Card.css';


const Modes = Object.freeze({
  GuessOnPiano: Symbol("Guess on piano"),
  GuessChordName: Symbol("Guess chord")
});

function Card() {
  const [ mode, setMode ] = useState(Modes.GuessOnPiano);
  const [ handsfree, setHandsfree ] = useState(false);
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
    setShowingChordName(current => !current);
  }

  const toggleChordPicture = function() {
    setShowingChordPicture(current => !current);
  }

  const toggleAccidentals = function() {
    setIncludeAccidentals(current => !current);
  }

  const toggleHandsfree = function() {
    setHandsfree(current => !current);
  }

  const chordPos = chordPosition(chord);

  const showAnswer = function() {
    setShowingChordName(true);
    setShowingChordPicture(true);
  }

  const nextStep = function() {
    if (!showingChordName || !showingChordPicture) {
      showAnswer();
    } else {
      newChord();
    }
  }

  const newChord = function() {
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


  useEffect(() => {
    const interval = setInterval(() => {
      if (handsfree) {
        nextStep();
      }
    }, 3000);
    return () => clearInterval(interval);
  });


  const pianoStyle = function() {
    if (mode === Modes.GuessChordName || showingChordPicture) {
      return {
        backgroundImage: "url('chords.png')",
        backgroundPositionX: chordPos.left,
        backgroundPositionY: chordPos.top,
        backgroundRepeat: "no-repeat",
        backgroundSize: "2675px 4448px"
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
    <div className="Card">
      <div className="controls">
        <div className="ModeSelector">
          <h3>Mode: </h3>
          <button
            onClick={() => setMode(Modes.GuessOnPiano)}
            disabled={ mode === Modes.GuessOnPiano }>
            Guess piano keys
          </button>
          <br/>
          <button
            onClick={() => setMode(Modes.GuessChordName)}
            disabled={ mode === Modes.GuessChordName }>
            Guess chord name
          </button>
        </div>
        <div className="ModifierSelector">
          <h3>Chord type: </h3>
          <ul>
            {modifiers.map((modifier, idx) =>
              <li key={idx}>
                <span className="modifierName">{modifier}</span>
                <input
                    type="checkbox"
                    onChange={(event) => toggleModifier(event, idx)}
                    checked={selectedMode[idx]}/>
              </li>
            )}
          </ul>
        </div>
        <div className="AccidentalsSelector">
          <h3>
            Accidentals:
            <input
              type="checkbox"
              onChange={toggleAccidentals}
              checked={includeAccidentals}/>
          </h3>
        </div>
        <div>
          <h3>Hands-free:
            <input
                type="checkbox"
                onChange={toggleHandsfree}
                checked={handsfree} />
          </h3>
        </div>
      </div>
      <div className="main">
        <div className="mainInner">
          {pianoPicture()}
          {chordTitle()}
          <button className="App-buttonNext" onClick={nextStep}>Next</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
