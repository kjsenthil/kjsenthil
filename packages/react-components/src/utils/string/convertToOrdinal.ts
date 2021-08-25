const convertToOrdinal = (index: number): string => {
  const units = index % 10;
  const tens = Math.floor((index % 100) / 10);

  let postfix;
  switch (units) {
    case 1:
      if (tens === 0) {
        postfix = 'st';
      } else {
        postfix = 'th';
      }
      break;
    case 2:
      postfix = 'nd';
      break;
    case 3:
      postfix = 'rd';
      break;
    default:
      postfix = 'th';
  }

  return `${index}${postfix}`;
};

export default convertToOrdinal;
