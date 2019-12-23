import { Node } from 'typescript';
import { CompletionItem, Position } from 'vscode-languageserver-protocol';

export interface IPostfixTemplate {
  buildCompletionItem(code: string, position: Position, node: Node): CompletionItem;

  canUse(node: Node): boolean;
}

