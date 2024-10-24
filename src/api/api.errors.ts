export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
  }
}

export class NotFoundError extends Error {
  constructor() {
    super('Not Found');
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super('Invalid Token');
  }
}
