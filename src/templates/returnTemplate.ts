import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { IPostfixTemplate } from '../template';

export class ReturnTemplate implements IPostfixTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('return', code)
      .description(`return expr`)
      .replace('return {{expr}}', position)
      .build();
  }

  canUse() {
    return true;
  }
}

export const build = () => new ReturnTemplate();
