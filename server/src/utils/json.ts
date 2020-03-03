export const safelyParseJSON = (possibleJSON: any) => {
  try {
    if (typeof possibleJSON === 'string') {
      return JSON.parse(possibleJSON);
    } else {
      throw new Error('possibleJSON argument is not a string.');
    }
  } catch (err) {
    throw new Error('Unable to parse json.');
  }
};
