import { CompletionItem, CompletionItemProvider, ExtensionContext, languages, workspace } from 'coc.nvim';
import glob from 'tiny-glob';
import { Position } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { BaseTemplate } from './baseTemplate';

const DOCUMENT_SELECTOR: string[] = ['typescript', 'javascript', 'go', 'python'];

class PostfixCompletionProvider implements CompletionItemProvider {
  private templates: BaseTemplate[] = [];

  constructor() {
    glob('templates/**/*.js', { cwd: __dirname }).then((files) => {
      files.forEach((path: string) => {
        const builder: () => BaseTemplate | BaseTemplate[] = require('./' + path).build;
        if (builder) {
          const tpls = builder();
          if (Array.isArray(tpls)) {
            this.templates.push(...tpls);
          } else {
            this.templates.push(tpls);
          }
        }
      });
    });
  }

  async provideCompletionItems(document: TextDocument, position: Position): Promise<CompletionItem[] | null> {
    const line = await workspace.getLine(document.uri, position.line);
    let firstNonWhitespaceCharacterIndex = line.length;
    for (let i = 0, len = line.length; i < len; i++) {
      if (!/\s/.test(line.charAt(i))) {
        firstNonWhitespaceCharacterIndex = i;
        break;
      }
    }

    const lastDot = line.lastIndexOf('.', position.character);
    if (lastDot === -1) {
      return null;
    }
    const last = line.substr(lastDot + 1);
    if (last && /[\s|()]/.test(last)) {
      return null;
    }

    const code = line.substr(firstNonWhitespaceCharacterIndex);
    if (!code) {
      return null;
    }

    // const prefix = line.substring(firstNonWhitespaceCharacterIndex, dotIdx);
    return this.templates.filter((t) => t.canUse(document.languageId)).map((t) => t.buildCompletionItem(code, position));
  }
}

export async function activate(context: ExtensionContext): Promise<void> {
  const enable = workspace.getConfiguration('postfix').get('enable', true);
  if (!enable) {
    return;
  }
  const provider = new PostfixCompletionProvider();
  context.subscriptions.push(languages.registerCompletionItemProvider('Postfix Completion', 'Postfix', DOCUMENT_SELECTOR, provider));
}
