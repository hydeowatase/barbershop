import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

import { instanceToInstance } from 'class-transformer';

class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id

        const listProvidersService = container.resolve(
            ListProvidersService,
        );

        const providers = await listProvidersService.execute({ user_id });

        return response.json(instanceToInstance(providers));
    }
}

export default ProvidersController;
