import { CompletionItemProvider, workspace } from 'coc.nvim';
import * as glob from 'glob';
import { CancellationToken, CompletionList, Position, TextDocument, CompletionItem } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from './template';

export class PostfixCompletionProvider implements CompletionItemProvider {
  private templates: IPostfixTemplate[] = [];

  constructor() {
    const files = glob.sync('./templates/*.js', { cwd: __dirname });
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

    const prefix = line.substring(firstNonWhitespaceCharacterIndex, dotIdx);

    return this.templates.filter(t => t.canUse(prefix)).map(t => t.buildCompletionItem(code, position));
  }
}
