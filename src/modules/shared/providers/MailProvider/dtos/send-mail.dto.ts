import { IParseMailTemplateDTO } from '../../MailTemplateProvider/dtos/parse-mail-template.dto';

interface IMailContact {
  name: string;
  email: string;
}

export interface ISendMailDTO {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplateDTO;
}
