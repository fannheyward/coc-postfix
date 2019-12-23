import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { getIndentCharacters } from '../utils';
import { BaseTemplate } from './baseTemplates';

export class IfTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('if', code)
      .description(`if (expr)`)
      .replace(`if ({{expr}}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class ElseTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    let replacement = '{{expr}}';

    return CompletionItemBuilder.create('else', code)
      .description(`if (!expr)`)
      .replace(`if (!${replacement}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class IfEqualityTemplate extends BaseTemplate {
  constructor(private keyword: string, private operator: string, private operand: string) {
    super();
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create(this.keyword, code)
      .description(`if (expr ${this.operator} ${this.operand})`)
      .replace(`if ({{expr}} ${this.operator} ${this.operand}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [
  new IfTemplate(),
  new ElseTemplate()
  // TODO
  // new IfEqualityTemplate('null', '===', null),
  // new IfEqualityTemplate('notnull', '!==', null),
  // new IfEqualityTemplate('undefined', '===', null),
  // new IfEqualityTemplate('notundefined', '!==', null)
];
