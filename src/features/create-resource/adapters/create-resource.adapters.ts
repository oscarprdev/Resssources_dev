import { Resources } from '@prisma/client';
import {
	CreateResourcesPorts,
	GetResourceByTitleInput,
	GetUserByUsernameInput,
	StoreResourceInput,
} from '../application/create-resources.ports';
import { ICreateResourceInfra } from '../infrastructure/create-resource.infra';
import { GetResourceByUrlInput } from '../infrastructure/create-resource.infra.types';

export class CreateResourceAdapters implements CreateResourcesPorts {
	constructor(private readonly createResourcesInfra: ICreateResourceInfra) {}

	async getUserByUsername({ username }: GetUserByUsernameInput) {
		return await this.createResourcesInfra.getUserByUsername({ username });
	}

	async getResourceByTitle({ title }: GetResourceByTitleInput): Promise<Resources | null> {
		return this.createResourcesInfra.getResourceByTitle({ title });
	}

	async getResourceByUrl({ resourceUrl }: GetResourceByUrlInput): Promise<Resources | null> {
		return this.createResourcesInfra.getResourceByUrl({ resourceUrl });
	}

	async storeResource({ resourceId, resourceUrl, title, description, faviconUrl, imgUrl, kinds, ownerId }: StoreResourceInput) {
		await this.createResourcesInfra.storeResource({
			resourceId,
			resourceUrl,
			title,
			description,
			faviconUrl,
			imgUrl,
			kinds,
			ownerId,
		});
	}
}
