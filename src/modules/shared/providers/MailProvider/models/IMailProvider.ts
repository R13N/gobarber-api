import { ISendMailDTO } from '../dtos/send-mail.dto';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
