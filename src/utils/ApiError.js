class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    statck = ""
  ) {
    super(message); // Call the super constructor with the provided message
    this.statusCode = statusCode;
    this.data = null;
    this.errors = errors;
    this.message = message;
    this.success = false;

    if (statck) {
      this.stack = statck;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
