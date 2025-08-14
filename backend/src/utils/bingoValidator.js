/**
 * Validates if a card matches the pattern with the called and marked numbers.
 * Doesn't touch DB, it's a pure and reusable function.
 *
 * @param {Object} game        - Must have called_numbers (array or JSON string)
 * @param {Object} card        - Must have numbers (array[25] or JSON string)
 * @param {Object} pattern     - Must have pattern (5x5 matrix or JSON string)
 * @param {number[]} markedNumbers - Numbers marked by the user on that card
 * @returns {{ valid: boolean, reason?: string }}
 */
export function validateCardBingo(game, card, pattern, markedNumbers) {
  // 0) Quick pre-checks
  if (!game)    return { valid: false, reason: 'Partida no encontrada.' };
  if (!card)    return { valid: false, reason: 'Cartón no encontrado.' };
  if (!pattern) return { valid: false, reason: 'Patrón no encontrado.' };
  if (!Array.isArray(markedNumbers)) {
    return { valid: false, reason: 'Números marcados inválidos.' };
  }

  // 1) Safe parsing
  let calledNumbers;
  try {
    calledNumbers = Array.isArray(game.called_numbers)
      ? game.called_numbers
      : JSON.parse(game.called_numbers ?? '[]');
  } catch {
    return { valid: false, reason: 'Error leyendo números cantados.' };
  }

  let patternMatrix;
  try {
    patternMatrix = Array.isArray(pattern.pattern)
      ? pattern.pattern
      : JSON.parse(pattern.pattern ?? '[]');
  } catch {
    return { valid: false, reason: 'Patrón de bingo inválido.' };
  }

  let cardNumbers;
  try {
    cardNumbers = Array.isArray(card.numbers)
      ? card.numbers
      : JSON.parse(card.numbers ?? '[]');
  } catch {
    return { valid: false, reason: 'Números del cartón inválidos.' };
  }

  // 2) Format validations
  if (!Array.isArray(patternMatrix) || patternMatrix.length !== 5
      || patternMatrix.some(row => !Array.isArray(row) || row.length !== 5)) {
    return { valid: false, reason: 'El patrón no es una matriz 5x5.' };
  }

  if (!Array.isArray(cardNumbers) || cardNumbers.length !== 25) {
    return { valid: false, reason: 'El cartón no tiene 25 posiciones.' };
  }

  // 3) Sets for O(1) quick lookups
  const calledSet = new Set(calledNumbers);
  const markedSet = new Set(markedNumbers);

  // 4) Rule: ALL marked numbers must have been called
  for (const num of markedSet) {
    if (!calledSet.has(num)) {
      return { valid: false, reason: 'Uno o más números marcados no han sido cantados.' };
    }
  }

  // 5) Rule: ALL pattern cells (1) must be marked on the card
  //    Note: if the card uses 'free' string in center and pattern requires it,
  //    we automatically consider it satisfied.
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      if (patternMatrix[row][col] === 1) {
        const index = row * 5 + col;
        const cardNumber = cardNumbers[index];

        // Free center or "free" cell
        if (cardNumber === 'free' || cardNumber === 'FREE') continue;

        if (!markedSet.has(cardNumber)) {
          return { valid: false, reason: 'El patrón no está completamente marcado.' };
        }
      }
    }
  }

  return { valid: true };
}