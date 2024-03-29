import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

import { instanceToInstance } from 'class-transformer';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ user_id });

        return response.json(instanceToInstance(user));
    }


    public async update(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id
        const { name, email, old_password, password } = request.body;

        const updateProfileService = container.resolve(UpdateProfileService);

        const updatedProfile = await updateProfileService.execute({
            user_id,
            name,
            email,
            old_password,
            password
        });

        return response.json(instanceToInstance(updatedProfile));
    }
}

export default ProfileController;
