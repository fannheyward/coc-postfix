import { CompletionItemProvider, workspace } from 'coc.nvim';
import { Node, SourceFile, createSourceFile, ScriptTarget } from 'typescript';
import * as glob from 'glob';
import { CancellationToken, CompletionList, Position, TextDocument, CompletionItem } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from './template';
import lodash from 'lodash';

interface INode {
  width: number;
  depth: number;
  node: Node;
}

const findNodeAtPosition = (source: SourceFile, character: number) => {
  function visitNode(node: Node, depth: number = 0) {
    const start = node.getStart(source);
    const end = node.getEnd();

    if (start <= character && character < end) {
      matchingNodes.push({
        depth,
        node,
        width: end - start
      });
    }

    node.getChildren(source).forEach(n => visitNode(n, depth + 1));
  }

  let matchingNodes: INode[] = [];
  source.statements.forEach(visitNode);
  let sortedNodes = lodash.orderBy(matchingNodes, [m => m.width, m => m.depth], ['asc', 'desc']);

  return sortedNodes.length > 0 && sortedNodes[0].node;
};

export class PostfixCompletionProvider implements CompletionItemProvider {
  private templates: IPostfixTemplate[] = [];

  constructor() {
    const files = glob.sync('./templates/forTemplates.js', { cwd: __dirname });
    files.forEach((path: string) => {
      const builder: () => IPostfixTemplate | IPostfixTemplate[] = require(path).build;
      if (builder) {
        let tpls = builder();
        if (Array.isArray(tpls)) {
          this.templates.push(...tpls);
        } else {
          this.templates.push(tpls);
        }
      }
    });
  }

  async provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): Promise<CompletionList | CompletionItem[] | null> {
    const line = await workspace.getLine(document.uri, position.line);
    let firstNonWhitespaceCharacterIndex = line.length;
    for (var i = 0, len = line.length; i < len; i++) {
      if (!/\s/.test(line.charAt(i))) {
        firstNonWhitespaceCharacterIndex = i;
        break;
      }
    }

    const dotIdx = line.lastIndexOf('.', position.character);
    if (dotIdx === -1) {
      return null;
    }

    const code = line.substr(firstNonWhitespaceCharacterIndex);
    if (!code) {
      return null;
    }

    const codePiece = line.substring(firstNonWhitespaceCharacterIndex, dotIdx);
    const source = createSourceFile('test.ts', codePiece, ScriptTarget.ES5, true);

    const currentNode = findNodeAtPosition(source, dotIdx - firstNonWhitespaceCharacterIndex - 1);
    if (!currentNode) {
      return null;
    }

    return this.templates.filter(t => t.canUse(currentNode)).map(t => t.buildCompletionItem(code, position, currentNode));
  }
}
