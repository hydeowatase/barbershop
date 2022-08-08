import AppError from '@shared/errors/AppError';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRespository: FakeUsersRespository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
    beforeEach(() => {
        fakeUsersRespository = new FakeUsersRespository();

        listProvidersService = new ListProvidersService(
            fakeUsersRespository,
        );
    });

    it('should be able to list the providers', async () => {
        const user1 = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'john001@gmail.com',
            password: 'abc123',
        });

        const user2 = await fakeUsersRespository.create({
            name: 'John Tre',
            email: 'johndoe002@gmail.com',
            password: 'abc123',
        });

        const loggedUser = await fakeUsersRespository.create({
            name: 'John Qua',
            email: 'johndoe003@gmail.com',
            password: 'abc123',
        });

        const ṕroviders = await listProvidersService.execute({
            user_id: loggedUser.id
        })

        expect(ṕroviders).toEqual([user1, user2])

    });

    it('should not be able to list the providers with wrong user_id', async () => {
        const loggedUser = await fakeUsersRespository.create({
            name: 'John Qua',
            email: 'johndoe003@gmail.com',
            password: 'abc123',
        });

        expect(
            listProvidersService.execute({
                user_id: loggedUser.id
            })
        ).rejects.toBeInstanceOf(AppError);

    });
});
