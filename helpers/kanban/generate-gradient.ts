export const generateColumnStyle = (index: number, total: number = 1) => {
  const intensity = 100 - ((index + 1) / (total - 1)) * 50;

  return { backgroundColor: `hsla(280, 52%, ${intensity}%, 50%)` };
};
