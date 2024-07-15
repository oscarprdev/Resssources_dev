import { Resources } from '@prisma/client';
import { RemoveResourcePorts, RemoveResourcePortsInput } from '../application/remove-resource/remove-resource.ports';
import { RemoveResourceClient } from '../infrastructure/remove-resources/remove-resources.client';

export class RemoveResourceAdapters implements RemoveResourcePorts {
	constructor(private readonly client: RemoveResourceClient) {}

	async getResourceById({ resourceId }: RemoveResourcePortsInput): Promise<Resources | null> {
		return await this.client.getResourceById({ resourceId });
	}

	async removeResource({ resourceId }: RemoveResourcePortsInput): Promise<void> {
		await this.client.removeResource({ resourceId });
	}
}
