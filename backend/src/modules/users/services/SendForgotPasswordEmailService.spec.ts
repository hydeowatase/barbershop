import AppError from '@shared/errors/AppError';

import FakeUsersRespository from '@modules/users/repositories/fakes/FakeUsersRespository';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import FakeMailProvider from '@shared/container/providers/IMailProvider/fakes/FakeMailProvider';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

let fakeUsersRespository: FakeUsersRespository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail', () => {
    beforeEach(() => {
        fakeUsersRespository = new FakeUsersRespository();
        fakeMailProvider = new FakeMailProvider();
        fakeUserTokensRepository = new FakeUserTokensRepository();

        sendForgotPasswordEmail = new SendForgotPasswordEmailService(
            fakeMailProvider,
            fakeUsersRespository,
            fakeUserTokensRepository,
        );
    });

    it('should be able to recover their password using e-mail', async () => {
        const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

        await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '@abc123',
        });

        await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

        // In this (send e-mail) we need to observe if the funtion sendMail have been called.
        // **RED** First execution of this test its need to fail
        // **GREEN** The Second execution of the test its necessary to adjust it and the test should have succeded. Its not be correct, but must passed.
        // **RECATORY** In this case the test should have passed, but all need to be correct closely to real world.

        expect(sendMail).toHaveBeenCalled();
    });

    it('should not be able to recover a non-existing user password', async () => {
        await expect(
            sendForgotPasswordEmail.execute({
                email: 'johndoe@gmail.com',
            }),
        ).rejects.toBeInstanceOf(AppError)
    });

    it('should be able to generate a forgot password token', async () => {
        const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

        const user = await fakeUsersRespository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '@abc123',
        });

        await sendForgotPasswordEmail.execute({ email: 'johndoe@gmail.com' });

        expect(generateToken).toHaveBeenCalledWith(user.id);
    });
});
