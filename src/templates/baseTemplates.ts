import { Node, SyntaxKind } from 'typescript';
import { CompletionItem, Position } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from '../template';

export abstract class BaseTemplate implements IPostfixTemplate {
  abstract buildCompletionItem(code: string, position: Position, node: Node): CompletionItem;

  protected isSimpleExpression = (node: Node) => node.kind === SyntaxKind.ExpressionStatement;
  protected isBinaryExpression = (node: Node) => node.kind === SyntaxKind.BinaryExpression;
  protected isCallExpression = (node: Node) => node.kind === SyntaxKind.CallExpression;
  protected inReturnStatement = (node: Node) => node.kind === SyntaxKind.ReturnStatement || (node.parent && this.inReturnStatement(node.parent));
  protected inIfStatement = (node: Node) => node.kind === SyntaxKind.IfStatement || (node.parent && this.inIfStatement(node.parent));

  canUse(node: Node) {
    return (
      node.parent &&
      !this.inReturnStatement(node.parent) &&
      !this.inIfStatement(node.parent) &&
      (this.isSimpleExpression(node.parent) || this.isBinaryExpression(node.parent) || this.isCallExpression(node.parent))
    );
  }
}
