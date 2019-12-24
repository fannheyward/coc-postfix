import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from './baseTemplates';

class ForTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('for', code)
      .description('for (let i = 0; i < expr.Length; i++)')
      .replace(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

class ForOfTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('forof', code)
      .description('for (let item of expr)')
      .replace(`for (let \${1:item} of \${2:{{expr}}}) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

class ForInTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('forin', code)
      .description('for (let item in expr)')
      .replace(`for (let \${1:key} in \${2:{{expr}}}) {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [new ForTemplate(), new ForOfTemplate(), new ForInTemplate()];
