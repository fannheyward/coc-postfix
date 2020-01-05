import { CompletionItem, Position } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from '../../template';

export abstract class BaseTemplate implements IPostfixTemplate {
  private get languages(): string[] {
    return ['go'];
  }

  abstract buildCompletionItem(code: string, position: Position): CompletionItem;

  indentCharacters = () => {
    // TODO
    return '\t';
  };

  canUse(language: string): boolean {
    if (this.languages.includes(language)) {
      return true;
    }
    return false;
  }
}
