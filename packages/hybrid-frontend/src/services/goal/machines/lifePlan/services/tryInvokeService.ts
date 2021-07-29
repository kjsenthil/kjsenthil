const tryInvokeService = async <T = unknown>(
  validate: () => undefined | null | Record<string, string>,
  callback: () => Promise<T>
): Promise<T> => {
  const errors = validate();

  if (errors && Object.keys(errors).length > 0) {
    return Promise.reject(errors);
  }

  const result = await callback();
  return Promise.resolve(result);
};
export default tryInvokeService;
