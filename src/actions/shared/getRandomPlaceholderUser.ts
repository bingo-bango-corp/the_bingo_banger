export const placeholderUsers = [
  '7zaIaH0swrNB7zBl89gI',
  'RkKniSBiXCWE08XyN5G5',
  'zvZuVSVRmhAyR295kFJY',
];

export default (): string => {
  const die = Math.floor(Math.random() * placeholderUsers.length);

  return placeholderUsers[die];
};
