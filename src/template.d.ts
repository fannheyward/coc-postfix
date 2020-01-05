import { CompletionItem, Position } from 'vscode-languageserver-protocol';

export interface IPostfixTemplate {
  buildCompletionItem(code: string, position: Position): CompletionItem;

  canUse(language: string): boolean;
}

