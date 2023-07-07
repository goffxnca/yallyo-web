export class PermissionNotAllowed extends Error {
  constructor(message: string) {
    super(message);
    this.name = "PermissionNotAllowed";
    // Optionally, you can capture the stack trace
    Object.setPrototypeOf(this, PermissionNotAllowed.prototype);
  }
}

export class CustomError2 extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError2";
    // Optionally, you can capture the stack trace
    Object.setPrototypeOf(this, CustomError2.prototype);
  }
}
