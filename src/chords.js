const originX = -390;
const originY = -776;
const stepX = -616;
const stepY = -350;

const notes = [
  "C", "C# / Db", "D", "D# / Eb", "E", "F",
  "F# / Gb", "G", "G# / Ab", "A", "A# / Bb", "B"
];

const modifiers = ["maj", "min", "aug", "dim", "7th"];

const randomChordName = function(modifiersMask) {

  // if no mask was passed, set mask to allow all modifiers
  if (!modifiersMask) {
    modifiersMask = modifiers.map(m => true);
  }

  // reduce the list of midifiers to the ones not masked
  const allowedModifiers = [];
  modifiers.forEach((modifier, index) => {
    if (modifiersMask[index]) allowedModifiers.push(modifier);
  });

  const randomNoteIndex = Math.floor(Math.random() * notes.length);
  const randomModifierIndex = Math.floor(Math.random() * allowedModifiers.length);

  return {
    note: notes[randomNoteIndex],
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
