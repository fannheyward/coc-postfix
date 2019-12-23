import { CompletionItem, Position } from 'vscode-languageserver-protocol';

export interface IPostfixTemplate {
  buildCompletionItem(code: string, position: Position): CompletionItem;

  canUse(code: string): boolean;
}

