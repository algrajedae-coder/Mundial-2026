import { Prediction, Match } from './types';

export const calculatePoints = (prediction: Prediction, match: Match): number => {
  if (match.marcadorLocal === null || match.marcadorVisitante === null) return 0;

  const predL = prediction.local;
  const predV = prediction.visitante;
  const resL = match.marcadorLocal;
  const resV = match.marcadorVisitante;

  // Exact match: 5 points
  if (predL === resL && predV === resV) {
    return 5;
  }

  // Correct goal difference (excluding draws unless exact): 3 points
  const predDiff = predL - predV;
  const resDiff = resL - resV;
  
  if (predDiff === resDiff) {
    return 3;
  }

  // Correct winner or draw: 1 point
  const predWinner = Math.sign(predDiff);
  const resWinner = Math.sign(resDiff);

  if (predWinner === resWinner) {
    return 1;
  }

  return 0;
};