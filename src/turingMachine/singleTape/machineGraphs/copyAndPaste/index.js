/**
 * Σ = {0, 1}
 * Γ = {0, 1, Λ, x, y, s}
 * L(A) = (0, 1)+
 */
export const copyAndPaste = {
    A :{
        0: {write: 'y', move: 'R', nextState: 'B-0'},
        1: {write: 'x', move: 'R', nextState: 'B-1'},
        s: {write: ' ', move: 'R', nextState: 'E'}
    },
    'B-0': {
        ' ': {write: 's', move: 'R', nextState: 'C-0'},
        s: {write: null, move: 'R', nextState: 'C-0'},
        0: {write: null, move: 'R', nextState: 'B-0'},
        1: {write: null, move: 'R', nextState: 'B-0'}
    },
    'C-0': {
        ' ': {write: '0', move: 'L', nextState: 'D'},
        0: {write: null, move: 'R', nextState: 'C-0'},
        1: {write: null, move: 'R', nextState: 'C-0'},
        s: {write: null, move: 'R', nextState: 'C-0'}
    },
    D: {
        x: {write: '1', move: 'R', nextState: 'A'},
        y: {write: '0', move: 'R', nextState: 'A'},
        0: {write: null, move: 'L', nextState: 'D'},
        1: {write: null, move: 'L', nextState: 'D'},
        s: {write: null, move: 'L', nextState: 'D'}
    },
    'B-1': {
        ' ': {write: 's', move: 'R', nextState: 'C-1'},
        s: {write: null, move: 'R', nextState: 'C-1'},
        0: {write: null, move: 'R', nextState: 'B-1'},
        1: {write: null, move: 'R', nextState: 'B-1'}
    },
    'C-1': {
        ' ': {write: '1', move: 'L', nextState: 'D'},
        0: {write: null, move: 'R', nextState: 'C-1'},
        1: {write: null, move: 'R', nextState: 'C-1'}
    },
    E: {
        ' ': {write: null, move: null, nextState: 'accept'},
        0: {write: null, move: 'R', nextState: 'E'},
        1: {write: null, move: 'R', nextState: 'E'}
    }
}
