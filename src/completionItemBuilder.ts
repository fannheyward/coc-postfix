import { CompletionItem } from 'coc.nvim';
import { CompletionItemKind, InsertTextFormat, Position, Range, TextEdit } from 'vscode-languageserver-protocol';

const COMPLETION_ITEM_TITLE = 'Postfix templates';

export class CompletionItemBuilder {
  private item: CompletionItem;

  constructor(private keyword: string, private code: string) {
    this.item = { label: this.keyword, kind: CompletionItemKind.Snippet, detail: COMPLETION_ITEM_TITLE };
  }

  public static create = (keyword: string, code: string) => new CompletionItemBuilder(keyword, code);

  public replace = (replacement: string, position: Position, useSnippets?: boolean): CompletionItemBuilder => {
    const codeBeforeTheDot = this.code.substr(0, this.code.lastIndexOf('.'));
    this.item.filterText = `${codeBeforeTheDot}.${this.keyword}`;

    if (useSnippets) {
      this.item.insertTextFormat = InsertTextFormat.Snippet;
      const escapedCode = codeBeforeTheDot.replace(/\$/g, '\\$');
      replacement = replacement.replace('{{expr}}', escapedCode);
    } else {
      replacement = replacement.replace('{{expr}}', codeBeforeTheDot);
    }

    const range = Range.create(position.line, Math.max(position.character - this.code.length, 0), position.line, position.character);
    this.item.insertText = replacement;
    this.item.additionalTextEdits = [TextEdit.del(range)];

    return this;
  };

  public description = (description: string): CompletionItemBuilder => {
    this.item.documentation = description;

    return this;
  };

  public build = () => this.item;
}
