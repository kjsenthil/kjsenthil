const getEndpoints = (): Record<string, string> => {
  try {
    if (process.env.API_ENDPOINTS) {
      return JSON.parse(process.env.API_ENDPOINTS);
    }
    throw new Error('process.env.API_ENDPOINTS is missing');
  } catch (e) {
    throw new Error('Unable to parse API endpoints');
  }
};

export default {
  ...getEndpoints(),
};
