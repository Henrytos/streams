import { nodemailer } from "../libs/nodemailer.ts";

interface SendEmailServiceRequest {
  to: string;
  from: string;
  subject: string;
  html: string;
}
interface SendEmailServiceResponse {
  response: string;
}

export class SendEmailService {
  async execute({
    to,
    from,
    subject,
    html,
  }: SendEmailServiceRequest): Promise<SendEmailServiceResponse> {
    const responseSendingEmail = await nodemailer.sendMail({
      to,
      from,
      subject,
      html,
    });

    return {
      response: responseSendingEmail.response,
    };
  }
}
