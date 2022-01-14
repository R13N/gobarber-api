import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import handlebars from 'handlebars';
import { IParseMailTemplateDTO } from '../dtos/parse-mail-template.dto';
import { IMailTemplateProvider } from '../models/mail-template.provider';

@Injectable()
export default class HandlebarsMailTemplateProvider
  implements IMailTemplateProvider
{
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
