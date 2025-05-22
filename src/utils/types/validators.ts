export type ValidatorReturnType<T> = true | { error: string; expected: T };
