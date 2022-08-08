import ICreateNotificationDTO from "@modules/notifications/dto/ICreateNotificationDTO";
import Notification from "@modules/notifications/infra/typeorm/schemas/Notification";

interface INotificationsRepository {
    create(data: ICreateNotificationDTO): Promise<Notification>;
}

export default INotificationsRepository;