import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from '../baseTemplate';

export class NotTemplate extends BaseTemplate {
  get languages() {
    return ['typescript', 'javascript', 'go'];
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('not', code).description('!expr').replace(`!{{expr}}`, position).build();
  }

  canUse(language: string) {
    return this.languages.includes(language);
  }
}

export const build = () => new NotTemplate();
