
import nodemailer, { Transporter } from 'nodemailer';

import { injectable, inject } from 'tsyringe'

import IMailProvider from "../models/IMailProvider";
import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO'

import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';

@injectable()
class EtherealMailProvider implements IMailProvider {
    private client: Transporter;

    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider,
    ) {
        nodemailer.createTestAccount().then(account => {
            const transporter = nodemailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass,
                }
            });
            this.client = transporter;
        });
    }

    public async sendMail({ from, to, subject, templateData }: ISendMailDTO): Promise<void> {
        const info = await this.client.sendMail({
            from: {
                name: from?.name || 'Teams Barbershop',
                address: from?.email || 'team@barbershop.com'
            },
            to: {
                name: to.name,
                address: to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData),
        });

        console.log('Message sent : %s', info.messageId);
        console.log('Preview url : %s', nodemailer.getTestMessageUrl(info));
    }
}

export default EtherealMailProvider;