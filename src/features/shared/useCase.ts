import { Either, isError } from '@/lib/either';
import { ZodType } from 'zod';

export class UseCase {
	constructor() {}

	protected validateInput<I>(input: I, schema: ZodType<I>, errorMessage?: string) {
		const validInput = schema.safeParse(input);
		if (validInput.error) throw new Error(errorMessage || 'Invalid input');
	}

	protected usePortResponse<R>(response: Either<string, R>) {
		if (isError(response)) throw new Error(response.error);

		return response.success;
	}
}
