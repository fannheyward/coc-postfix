import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from '../baseTemplate';

export class ReturnTemplate extends BaseTemplate {
  get languages() {
    return [];
  }

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
