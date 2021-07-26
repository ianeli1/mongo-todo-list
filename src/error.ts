interface ErrorType {
  message: string;
}

export function standardError({ message }: ErrorType) {
  return {
    message,
  };
}
