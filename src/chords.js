const originX = -229;
const originY = -692;
const stepX = -470;
const stepY = -313;

const notes = [
  "C", "C# / Db", "D", "D# / Eb", "E", "F",
  "F# / Gb", "G", "G# / Ab", "A", "A# / Bb", "B"
];

const modifiers = ["maj", "min", "aug", "dim", "7th"];

const randomChordName = function(modifiersMask, includeAccidentals) {

  // if no mask was passed, set mask to allow all modifiers
  if (!modifiersMask) {
    modifiersMask = modifiers.map(m => true);
  }

  // reduce the list of midifiers to the ones not masked
  const allowedModifiers = [];
  modifiers.forEach((modifier, index) => {
    if (modifiersMask[index]) allowedModifiers.push(modifier);
  });

  const allowedNotes = (!includeAccidentals) ?
    [ "C", "D", "E", "F", "G", "A", "B" ] : notes;


  const randomNoteIndex = Math.floor(Math.random() * allowedNotes.length);
  const randomModifierIndex = Math.floor(Math.random() * allowedModifiers.length);

  return {
    note: allowedNotes[randomNoteIndex],
    modifier: allowedModifiers[randomModifierIndex]
  }
};

const chordPosition = function({note, modifier}) {
  const notePos = notes.indexOf(note);
  const modifierPos = modifiers.indexOf(modifier);

  return {
    left: originX + modifierPos * stepX,
    top: originY + notePos * stepY
  };
};

export { notes, modifiers, chordPosition, randomChordName };
