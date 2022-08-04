import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );
  });

  it('should be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'abc123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with an email that have been used', async () => {
    await createUserService.execute({
      name: 'Yohany Doe',
      email: 'yohanydue@gmail.com',
      password: 'abc123',
    });

    await expect(
      createUserService.execute({
        name: 'Mary Doe',
        email: 'yohanydue@gmail.com',
        password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
