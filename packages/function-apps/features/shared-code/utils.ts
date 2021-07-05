function getFunctionAppConfig(name: string): string {
  if (name in process.env) {
    return process.env[name] ?? '';
  }
  throw Error(`Required function app config item ${name} was not found`);
}

export { getFunctionAppConfig };
