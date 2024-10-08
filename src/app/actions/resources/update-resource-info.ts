'use server';

import { auth } from '@/auth';
import { provideEditResourceUsecase } from '@/features/resources/edit';
import { errorResponse } from '@/lib/either';
import { revalidatePath } from 'next/cache';

export interface UpdateResourceInfoActionInput {
	title: string;
	description: string;
	resourceId: string;
	resourceUrl: string;
	imgUrl: string;
}

export const updateResourceInfoAction = async (input: UpdateResourceInfoActionInput) => {
	const session = await auth();
	if (!session?.user || !session.user.name) return errorResponse('User not authorized');

	const usecase = provideEditResourceUsecase();

	const response = await usecase.updateResourceInfo({
		...input,
		username: session.user.name,
	});

	revalidatePath('/');
	revalidatePath('/dashboard');

	return response;
};
