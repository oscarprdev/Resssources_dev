import prisma from '@/services/db';
import { CreateResourceInput } from './types';

export const createResource = async ({ title, description, faviconUrl, imgUrl, resourceUrl, kind, ownerId }: CreateResourceInput) => {
	return await prisma.resource.create({
		data: {
			title,
			description,
			faviconUrl,
			imgUrl,
			resourceUrl,
			kind,
			resourceCreatedBy: {
				create: {
					user: {
						connect: {
							id: ownerId,
						},
					},
				},
			},
		},
	});
};
