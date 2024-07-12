class EmptyUserError extends Error {
  constructor(message) {
    super(message);
  }
}

module.exports = EmptyUserError;