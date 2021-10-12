export type Title = 'Mr.' | 'Mrs.' | 'Miss.' | 'Ms.' | 'Dr.' | 'Sir.';

const titles: Array<{ id: number; value: Title }> = [
  { id: 1, value: 'Mr.' },
  { id: 12, value: 'Mrs.' },
  { id: 13, value: 'Miss.' },
  { id: 22, value: 'Ms.' },
  { id: 33, value: 'Dr.' },
  { id: 46, value: 'Sir.' },
];

export default titles;
