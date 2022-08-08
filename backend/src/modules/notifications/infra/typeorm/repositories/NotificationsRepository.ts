import { getMongoRepository, MongoRepository } from 'typeorm';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICreateNotificationDTO from '@modules/notifications/dto/ICreateNotificationDTO';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

class NotificationsRepository implements INotificationsRepository {
    private ormRepository: MongoRepository<Notification>;

    constructor() {
        // here it's necessary to inform the schema/entity and the name of connection, in this case is mongo,
        // if the connection name isn't passed the connection will be the dafult, in this case is PostgreSQL
        this.ormRepository = getMongoRepository(Notification, 'mongo');
    }

    public async create({
        content,
        recipient_id
    }: ICreateNotificationDTO): Promise<Notification> {
        const notification = this.ormRepository.create({ content, recipient_id });

        await this.ormRepository.save(notification);

        return notification;
    }
}

export default NotificationsRepository;
