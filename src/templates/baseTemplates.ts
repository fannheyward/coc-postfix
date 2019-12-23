import { CompletionItem, Position } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from '../template';

export abstract class BaseTemplate implements IPostfixTemplate {
  abstract buildCompletionItem(code: string, position: Position): CompletionItem;

  canUseNew(code: string): boolean {
    return false;
  }
}
