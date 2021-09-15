const dateOrUndefined = (date?: string | null): Date | undefined =>
  date ? new Date(date) : undefined;

export default dateOrUndefined;
