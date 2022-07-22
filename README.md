# barbershop
A fullstack application developed with NodeJS, ReactJS and React Native.
     
# Mapping functionalities
# Password recovery
**RF**
The user should be able to recover their password using e-mail.
The user should receiver an e-mail with instructions about password recovering.
The user should be able to reset their own password.

**RNF**
E-mail service must use the library nodemailer
Use mailtrap to test send mail service
Use Amazon SES to send e-mails on production
Send mail service must run on background job


**RN**
Then link sent by email to recover password must be expire in a specific period, ex 2 hours.
The user must confirm his new password when reset the password.


# Profile update
**RF**
The user should be able to update their own profile.

**RN**
The user can't update their profile with an e-mail that has already been used.
To update their password, the user must inform their old password.
To update their password, the user must confirm the new password.

# Provider's panel
**RF**
The user should be able to list their own appointments of a specific day
The provider must receiver a notification when an appointment is created
The provider should be able to visualize all unread notifications

**RNF**
The appointments of the day of a provider must be storaged in cache 
The provider's notifications must be storage on Mongo DB 
The provider's notification must be sent in real time using Socket.IO 

**RN**
The notification must have status, "readed" and "unread", that provider can control


# Appointment Service schedule
**RF**
The user should be able to list all registered service providers
The user should be able to list a provider's days of a month with at least one time available.
The user should be able to list a provider's available hours of specific day.
The user should be able to create an appointment with a provider.

**RNF**
The providers list must be storaged in cache
When a new provider is registered the cache must be clean 

**RN**
Each appointment must least at most an hour.
The functionality "create appointment" must be available from 8am to 6pm. (First at 8am and the last at 5pm).
The user shouldn't be able to appoint at an hour that has already been apointed
The uset cannot appoint service in an hour that has passed.
The customer provider can't be the same person in an appointment, The user can't appoint a service with themselves