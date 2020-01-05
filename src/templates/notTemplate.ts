import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { IPostfixTemplate } from '../template';

export class NotTemplate implements IPostfixTemplate {
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
