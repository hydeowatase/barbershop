import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
    beforeEach(() => {
        fakeUsersRespository = new FakeUsersRespository();
        fakeHashProvider = new FakeHashProvider();

        updateProfileService = new UpdateProfileService(
            fakeUsersRespository,
            fakeHashProvider,
        );
    });

    it('should be able to update their profile', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John da Silva',
            email: 'johndasilva@gmail.com',
        });

        expect(updatedUser.name).toBe('John da Silva');
        expect(updatedUser.email).toBe('johndasilva@gmail.com');
    });

    it('should not be able to update profile from non-existing-user', async () => {
        expect(
            updateProfileService.execute({
                user_id: 'non-existing-user-id',
                name: 'John da Silva',
                email: 'johndasilva@gmail.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to change to another user e-mail', async () => {
        await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });

        const otherUser = await fakeUsersRespository.create({
            name: 'John da Silva',
            email: 'other_user@gmail.com',
            password: 'abc123',
        });

        await expect(
            updateProfileService.execute({
                user_id: otherUser.id,
                name: 'John da Silva Sauro',
                email: 'johndoe@gmail.com',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able to update their password', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });

        const updatedUser = await updateProfileService.execute({
            user_id: user.id,
            name: 'John da Silva',
            email: 'johndasilva@gmail.com',
            old_password: 'abc123',
            password: 'abc1234'
        });

        expect(updatedUser.password).toBe('abc1234');
    });

    it('should not be able to update their password without old password', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });



        expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John da Silva',
                email: 'johndasilva@gmail.com',
                password: 'abc1234'
            })
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should not be able to update their password with worng old password', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });



        expect(
            updateProfileService.execute({
                user_id: user.id,
                name: 'John da Silva',
                email: 'johndasilva@gmail.com',
                old_password: 'aaaa',
                password: 'abc1234'
            })
        ).rejects.toBeInstanceOf(AppError)
    });
});
