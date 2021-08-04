function monthsDiff(dateFrom: Date, dateTo: Date): number {
  const years = yearsDiff(dateFrom, dateTo);
  let months = (years * 12) + (dateTo.getMonth() - dateFrom.getMonth());
  const diffDays = dateTo.getDate() - dateFrom.getDate();
  if (diffDays < 0) {
    months--;
  }

  return Math.round(months);
}

function yearsDiff(dateFrom: Date, dateTo: Date): number {
  return dateTo.getFullYear() - dateFrom.getFullYear();
}

export {
  monthsDiff,
  yearsDiff
};