/**
 * Returns the possessive suffix for a proper noun
 * @example
 * // returns 's
 * getPossessiveSuffix(Tom)
 * @example
 * // returns '
 * getPossessiveSuffix(Thomas)
 */
const getPossessiveSuffix = (noun: string) => (noun[noun.length - 1] === 's' ? "'" : "'s");

export default getPossessiveSuffix;
