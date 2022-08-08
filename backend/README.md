- Mapping Application Features

# Password recover

**RF (Functional Requirements)**
- The user must be able to recover their password entering his e-mail;
- The user must receive an e-mail with instructions about password recover;
- The user must be able to reset their password

**RNF (Non-Functional Requirements)**
- Use Mailtrap to test sending e-mails in development environment
- Use Amazon SES (Amazon simple e-mail service) to sending e-mails in production environment
- The send e-mail service must to work in background

**RN (Business Rules)**
- The recover password link sent by e-mail must expire in 2 hours
- The user must to confirm their new password by typing twice.

# Update profile

**RF (Functional Requirements)**

- The user must be able to update their name, e-mail and password

**RN (Business Rules)**

- The user should not be able to update their e-mail to another e-mail that has already used by another user;
- For update a new password the user must to confirm their old password;
- The user must to confirm their new password by typing twice;

# Provider panel

**RF (Functional Requirements)**
- The user must be able to list their all achedule services
- The provider must receive an notificação every time tha has been registered a new appointment
- The procider must able able to see all notification that not be readed.

**RNF (Non-Functional Requirements)**
- The provider appointments of the day must be cached;
- The provider notifications must be storaged in mongodb;
- The provider notifications must be sended in real-time using Socket.io

**RN (Business Rules)**
- The notification must have a read ou unread status

# Appointment service

**RF (Functional Requirements)**

- The user must be able to list all registered providers/staffs;
- The user must be able to list a provider´s schedule with a minimum available day;
- The user must be able to list all available hours in a day from a specified provider;
- The user must be able to make an appointment with a provider;

**RNF (Non-Functional Requirements)**
- The list of providers must be storaged in cached to avoid loss of performance

**RN (Business Rules)**

- The appointments must be available between 8am and 6pm (The first at 8am and the last at 5pm);
- The user cannot make an appointment at a past time;
- The user cannot make an appointment with himself;
- Each appointment must least one hour; - OK
- The user cannot make an appointment that has already acheduled; - OK
