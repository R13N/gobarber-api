import { IParseMailTemplateDTO } from '../dtos/parse-mail-template.dto';

export interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
