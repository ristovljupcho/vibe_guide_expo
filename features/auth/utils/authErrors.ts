type ClerkErrorShape = {
  errors?: {
    longMessage?: string;
    message?: string;
  }[];
  message?: string;
};

function isErrorShape(value: unknown): value is ClerkErrorShape {
  return typeof value === 'object' && value !== null;
}

export function getAuthErrorMessage(error: unknown, fallback: string) {
  if (!isErrorShape(error)) {
    return fallback;
  }

  return error.errors?.[0]?.longMessage ?? error.errors?.[0]?.message ?? error.message ?? fallback;
}
