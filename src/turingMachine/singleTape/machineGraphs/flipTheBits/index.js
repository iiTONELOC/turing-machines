/**
 * Flips the bits in a binary string
 * 
 * Σ = {0, 1}
 * Γ = {0, 1, Λ}
 * L(A) = (0, 1)*
 */
export const flipTheBitsTransitions =  {
      q0: {
        0: {write: '1', move: 'R', nextState: 'q0'},
        1: {write: '0', move: 'R', nextState: 'q0'},
        ' ': {write: ' ', move: 'L', nextState: 'accept'}
      },
      accept: {}
    };