import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { ESBaseTemplate } from './baseTemplate';

export class IfTemplate extends ESBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('if', code)
      .description(`if (expr)`)
      .replace(`if ({{expr}}) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class ElseTemplate extends ESBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('else', code)
      .description(`if (!expr)`)
      .replace(`if (!{{expr}}) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class IfEqualityTemplate extends ESBaseTemplate {
  constructor(private keyword: string, private operator: string, private operand: string) {
    super();
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create(this.keyword, code)
      .description(`if (expr ${this.operator} ${this.operand})`)
      .replace(`if ({{expr}} ${this.operator} ${this.operand}) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [
  new IfTemplate(),
  new ElseTemplate(),
  new IfEqualityTemplate('null', '===', 'null'),
  new IfEqualityTemplate('notnull', '!==', 'null'),
  new IfEqualityTemplate('undefined', '===', 'undefined'),
  new IfEqualityTemplate('notundefined', '!==', 'undefined'),
];
