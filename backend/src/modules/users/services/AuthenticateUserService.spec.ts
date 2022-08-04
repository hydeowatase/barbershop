import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUserService from '@modules/users/services/CreateUserService';

let fakeUsersRespository: FakeUsersRespository;
let fakeHashProvider: FakeHashProvider;
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;


describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );
    authenticateUserService = new AuthenticateUserService(
      fakeUsersRespository,
      fakeHashProvider,
    );
  });


  it('should be able to authenticate', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'abc123',
    });

    const response = await authenticateUserService.execute({
      email: user.email,
      password: 'abc123',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: 'abc123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong user password', async () => {
    await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'abc123',
    });

    await expect(
      authenticateUserService.execute({
        email: 'johndoe@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
