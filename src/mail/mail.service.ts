import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MailService {
    constructor (private mailerService: MailerService) {}
    
    async sendUserConfirmation(user: User) : Promise<void> {
        const url = `http://localhost:${process.env.PORT}/api/users/activate/${user.activation_link}`;
        await this.mailerService.sendMail({
            to: user.mail,
            subject: "Welcome! Confirm your Email",
            template: "./confirmation",
            context: {
                name: user.firstName,
                url
            }
        })
    }
}