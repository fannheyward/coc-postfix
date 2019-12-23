import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { getIndentCharacters } from '../utils';
import { BaseTemplate } from './baseTemplates';

export class ForTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    console.error(`for (let \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`);
    return CompletionItemBuilder.create('for', code)
      .description('for (const i = 0; i < expr.Length; i++)')
      .replace(`for (const \${1:i} = 0; \${1} < \${2:{{expr}}}.length; \${1}++) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .build();
  }

  canUseNew(code: string): boolean {
    return true;
  }
}

export class ForOfTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('forof', code)
      .description('for (let item of expr)')
      .replace(`for (let \${1:item} of \${2:{{expr}}}) {\n${getIndentCharacters()}\${0}\n}`, position, true)
      .build();
  }

  canUseNew(code: any): boolean {
    return false;
  }
}

export const build = () => [new ForTemplate(), new ForOfTemplate()];
