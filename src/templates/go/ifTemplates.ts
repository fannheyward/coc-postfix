import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { GoBaseTemplate } from './baseTemplate';

export class IfTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('iflen', code)
      .description('if len(expr)')
      .replace(`if len({{expr}}) $1 {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class ElseTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('else', code)
      .description('if !expr')
      .replace(`if !{{expr}} {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class IfEqualityTemplate extends GoBaseTemplate {
  constructor(private keyword: string, private operator: string, private operand: string) {
    super();
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create(this.keyword, code)
      .description(`if expr ${this.operator} ${this.operand}`)
      .replace(`if {{expr}} ${this.operator} ${this.operand} {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [
  new IfTemplate(),
  new ElseTemplate(),
  new IfEqualityTemplate('nil', '==', 'nil'),
  new IfEqualityTemplate('notnil', '!=', 'nil')
];
