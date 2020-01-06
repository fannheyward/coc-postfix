import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from '../baseTemplate';

export class NotTemplate extends BaseTemplate {
  get languages() {
    return [];
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('not', code)
      .description('!expr')
      .replace(`!{{expr}}`, position)
      .build();
  }

  canUse() {
    return true;
  }
}

export const build = () => new NotTemplate();
