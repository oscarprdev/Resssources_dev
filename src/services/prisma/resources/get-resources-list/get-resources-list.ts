import prisma from '../../db';
import { GetResourcesListByFavInput, GetResourcesListByKindInput, GetResourcesListByOwnerInput } from './types';

export const getResourcesList = async () => {
	return await prisma.resources.findMany();
};

export const getHeroResourcesList = async () => {
	return await prisma.resources.findMany({
		select: {
			id: true,
			title: true,
			imgUrl: true,
		},
	});
};

export const getResourcesListByOwner = async ({ userId }: GetResourcesListByOwnerInput) => {
	return prisma.resources.findMany({
		where: {
			resourceCreatedBy: {
				some: { userId },
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

export const getResourcesListByFav = async ({ userId }: GetResourcesListByFavInput) => {
	return await prisma.resources.findMany({
		where: {
			favouritedBy: {
				some: { userId },
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};

export const getResourcesListByKind = async ({ kind }: GetResourcesListByKindInput) => {
	return await prisma.resources.findMany({
		where: {
			kind: {
				hasSome: kind,
			},
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
};
