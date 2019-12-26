import { CompletionItemProvider, ExtensionContext, languages, workspace } from 'coc.nvim';
import glob from 'tiny-glob';
import { CompletionItem, CompletionList, Position, TextDocument } from 'vscode-languageserver-protocol';
import { IPostfixTemplate } from './template';

const DOCUMENT_SELECTOR: string[] = ['typescript', 'javascript'];

class PostfixCompletionProvider implements CompletionItemProvider {
  private templates: IPostfixTemplate[] = [];

  constructor() {
    glob('templates/**/*.js', { cwd: __dirname }).then(files => {
      files.forEach((path: string) => {
        console.error(path);
        const builder: () => IPostfixTemplate | IPostfixTemplate[] = require('./' + path).build;
        if (builder) {
          let tpls = builder();
          if (Array.isArray(tpls)) {
            this.templates.push(...tpls);
          } else {
            this.templates.push(tpls);
          }
        }
      });
    });
  }

  async provideCompletionItems(document: TextDocument, position: Position): Promise<CompletionList | CompletionItem[] | null> {
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

export async function activate(context: ExtensionContext): Promise<void> {
  const provider = new PostfixCompletionProvider();
  context.subscriptions.push(languages.registerCompletionItemProvider('Postfix Completion', 'Postfix', DOCUMENT_SELECTOR, provider));
}
