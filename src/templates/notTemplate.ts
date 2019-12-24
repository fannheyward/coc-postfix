import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from './baseTemplates';

export class NotTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('not', code)
      .description('!expr')
      .replace(`!{{expr}}`, position)
      .build();
  }
}

export const build = () => new NotTemplate();
