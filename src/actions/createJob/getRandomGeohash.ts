const baseHashes = [
  'u337h',
  'u337j',
  'u337n',
  'u337p',
  'u33e2',
  'u33e0',
  'u33e1',
  'u33e4',
  'u33e5',
  'u33eh',
  'u336v',
  'u336y',
  'u336z',
  'u336s',
  'u336t',
  'u336w',
  'u336x',
  'u336m',
  'u33db',
  'u33dc',
  'u33dc',
  'u33dc',
  'u33dc',
  'u33dc',
  'u33d9',
  'u33d9',
  'u33d9',
  'u33d9',
  'u33dd',
  'u33d8',
  'u33d8',
  'u33d8',
  'u33de',
  'u33d2',
  'u33d3',
  'u336r',
  'u33ddp',
  'u33ddp',
  'u33ddr',
  'u33ddr',
  'u33dck',
  'u33dck',
  'u33dc1',
  'u33dc1',
  'u33d8x',
];

export default () => {
  const die = Math.floor(Math.random() * baseHashes.length);

  return baseHashes[die] + randomHashChar(3);
};

const randomHashChar = (length: number) => {
  let result = '';
  const characters = 'bcdefghjkmnpqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < length; i++) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};
