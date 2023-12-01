export class ValidationError extends Error {
  errors: { [field: string]: string[] };

  constructor(errors: { [field: string]: string[] }) {
    super();
    this.errors = errors;

    super.message = this.stringifyErrorMessage(errors);
  }

  stringifyErrorMessage(error) {
    let errorMessage = '';

    for (const field in error) {
      if (error.hasOwnProperty(field)) {
        const errors = error[field].join(', ');
        errorMessage += `${field}: ${errors}; `;
      }
    }

    return errorMessage.trim();
  }
}
