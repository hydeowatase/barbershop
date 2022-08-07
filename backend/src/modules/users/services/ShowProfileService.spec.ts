import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUsersRespository: FakeUsersRespository;
let showProfileService: ShowProfileService;

describe('ShowProfile', () => {
    beforeEach(() => {
        fakeUsersRespository = new FakeUsersRespository();

        showProfileService = new ShowProfileService(
            fakeUsersRespository,
        );
    });

    it('should be able to show the profile', async () => {
        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'abc123',
        });

        const profile = await showProfileService.execute({
            user_id: user.id,
        });

        expect(profile.name).toBe('John Doe');
        expect(profile.email).toBe('johndoe@gmail.com');
    });

    it('should not be able to show the profile of non-existing user', async () => {
        expect(
            showProfileService.execute({
                user_id: 'non-existing-user-id',
            })
        ).rejects.toBeInstanceOf(AppError);

    });
});
