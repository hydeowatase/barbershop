import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProviders/fakes/FakeStorageProvider';
import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

let fakeUsersRespository: FakeUsersRespository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'abc123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar for non existing user', async () => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeStorageProvider = new FakeStorageProvider();

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update avatar when user had one', async () => {
    fakeUsersRespository = new FakeUsersRespository();
    fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRespository,
      fakeStorageProvider,
    );

    const user = await fakeUsersRespository.create({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'abc123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFileName: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
