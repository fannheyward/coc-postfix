import { Node } from 'typescript';
import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from './baseTemplates';

export class NotTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position, node: Node) {
    code = node.parent.getText() + '.';

    let replacement = '{{expr}}';
    if (this.isBinaryExpression(node.parent)) {
      replacement = `(${replacement})`;
    }

    return CompletionItemBuilder.create('not', code)
      .description('!expr')
      .replace(`!${replacement}`, position)
      .build();
  }

  canUse(node: Node) {
    return node.parent && (this.isSimpleExpression(node.parent) || this.isBinaryExpression(node.parent) || this.isCallExpression(node.parent));
  }
}

export const build = () => new NotTemplate();
