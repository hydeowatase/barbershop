import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';

let fakeUsersRespository: FakeUsersRespository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPasswordService: ResetPasswordService;

// ** Others tests to be write **
// hash of password on update - OK
// token inexisting
// 2 hours expiration
// user inexisting

describe('ResetPasswordService', () => {
    beforeEach(() => {
        fakeUsersRespository = new FakeUsersRespository();
        fakeUserTokensRepository = new FakeUserTokensRepository();
        fakeHashProvider = new FakeHashProvider();

        resetPasswordService = new ResetPasswordService(
            fakeUsersRespository,
            fakeUserTokensRepository,
            fakeHashProvider
        );
    });

    it('should be able to reset password', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '@abc123',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

        await resetPasswordService.execute({
            token,
            password: '@newpassword'
        });

        const updatedUser = await fakeUsersRespository.findById(user.id);

        expect(generateHash).toHaveBeenCalledWith('@newpassword');
        expect(updatedUser?.password).toBe('@newpassword');
    });

    it('should not be able to reset password with non-existing token', async () => {
        await expect(
            resetPasswordService.execute({
                token: 'non-existing-token',
                password: '@newpassword'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password with non-existing user', async () => {
        const { token } = await fakeUserTokensRepository.generate('non-existing-user');

        await expect(
            resetPasswordService.execute({
                token,
                password: '@newpassword'
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to reset password after expiration time of 2 hours ', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '@abc123',
        });

        const { token } = await fakeUserTokensRepository.generate(user.id);

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            const customDate = new Date();

            return customDate.setHours(customDate.getHours() + 3);
        });


        await expect(
            resetPasswordService.execute({
                token,
                password: '@newpassword'
            })
        ).rejects.toBeInstanceOf(AppError);
    });
});
