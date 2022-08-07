import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

class ProfileController {
    public async show(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id

        const showProfileService = container.resolve(ShowProfileService);

        const user = await showProfileService.execute({ user_id });

        const userWithoutPassword = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at
        };

        return response.json(userWithoutPassword);
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

        // delete user.password;
        // Com a atualização do TypeScript, isso se faz necessário
        const userWithoutPassword = {
            id: updatedProfile.id,
            name: updatedProfile.name,
            email: updatedProfile.email,
            created_at: updatedProfile.created_at,
            updated_at: updatedProfile.updated_at
        };

        return response.json(userWithoutPassword);
    }
}

export default ProfileController;
