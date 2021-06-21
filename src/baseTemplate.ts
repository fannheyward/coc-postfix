import { CompletionItem } from 'coc.nvim';
import { Position } from 'vscode-languageserver-protocol';

export abstract class BaseTemplate {
  abstract get languages(): string[];
  abstract buildCompletionItem(code: string, position: Position): CompletionItem;

  indentCharacters() {
    // TODO
    return '\t';
  }

  canUse(language: string): boolean {
    if (this.languages.includes(language)) {
      return true;
    }

    return false;
  }
}
