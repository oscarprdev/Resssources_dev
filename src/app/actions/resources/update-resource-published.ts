'use server';

import { auth } from '@/auth';
import { provideEditResourceUsecase } from '@/features/resources/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export interface UpdateResourcePublishedActionInput {
	resourceId: string;
	published: boolean;
}

export const updateResourcePublishedAction = async (input: UpdateResourcePublishedActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideEditResourceUsecase();

	const response = await usecase.updateResourcePublished({
		...input,
		username: session.user.name,
	});

	revalidatePath('/');
	revalidatePath('/dashboard');

	return response;
};
