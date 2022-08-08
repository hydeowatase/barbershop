import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
    user_id: string;
}

@injectable()
class ListProvidersService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) { }

    public async execute({ user_id }: IRequest): Promise<User[]> {
        const providers = await this.usersRepository.findAllProviders({ except_user_id: user_id });

        if (!providers || providers.length < 1) {
            throw new AppError('There are no providers registered.');
        }

        return providers;
    }
}

export default ListProvidersService;
