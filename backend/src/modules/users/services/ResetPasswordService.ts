import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {
    constructor(

        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

    ) { }

    public async execute({ password, token }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User's token does not exist.");
        }

        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Expired token.');
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        user.password = await this.hashProvider.generateHash(password);

        this.usersRepository.save(user);

    }
}

export default ResetPasswordService;
