import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import { instanceToInstance } from 'class-transformer';

class UsersAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    if (!request.file) {
      return response.status(400).json({ message: 'File is mandatory.' });
    }

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFileName: request.file?.filename,
    });

    return response.json(instanceToInstance(user));
  }
}

export default UsersAvatarController;
