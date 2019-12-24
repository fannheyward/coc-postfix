import { CompletionItem, Position } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from '../template';

export abstract class BaseTemplate implements IPostfixTemplate {
  abstract buildCompletionItem(code: string, position: Position): CompletionItem;

  indentCharacters = () => {
    // TODO
    return '\t';
  };

  canUse(code: string): boolean {
    return true;
  }
}
