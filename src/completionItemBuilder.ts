import { TextEdit, CompletionItem, Range, CompletionItemKind, Position, InsertTextFormat } from 'vscode-languageserver-protocol';

const COMPLETION_ITEM_TITLE = 'Postfix templates';

export class CompletionItemBuilder {
  private item: CompletionItem;

  constructor(private keyword: string, private code: string) {
    this.item = CompletionItem.create(this.keyword);
    this.item.kind = CompletionItemKind.Snippet;
    this.item.detail = COMPLETION_ITEM_TITLE;
    this.item.preselect = true;
  }

  public static create = (keyword: string, code: string) => new CompletionItemBuilder(keyword, code);

  public replace = (replacement: string, position: Position, useSnippets?: boolean): CompletionItemBuilder => {
    const codeBeforeTheDot = this.code.substr(0, this.code.lastIndexOf('.'));

    if (useSnippets) {
      this.item.insertTextFormat = InsertTextFormat.Snippet;
      const escapedCode = codeBeforeTheDot.replace('$', '\\$');
      replacement = replacement.replace('{{expr}}', escapedCode);
    } else {
      replacement = replacement.replace('{{expr}}', codeBeforeTheDot);
    }

    const range = Range.create(position.line, Math.max(position.character - this.code.length, 0), position.line, position.character);
    this.item.textEdit = TextEdit.replace(range, replacement);

    return this;
  };

  public description = (description: string): CompletionItemBuilder => {
    this.item.documentation = description;

    return this;
  };

  public build = () => this.item;
}
