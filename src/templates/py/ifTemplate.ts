import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { PyBaseTemplate } from './baseTemplate';

export class IfTemplate extends PyBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('if', code)
      .description('if expr')
      .replace(`if {{expr}}:\n${this.indentCharacters()}\${0}\n`, position, true)
      .build();
  }
}

export class IfNotTemplate extends PyBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('ifn', code)
      .description('if expr is None')
      .replace(`if {{expr}} is None:\n${this.indentCharacters()}\${0}\n`, position, true)
      .build();
  }
}

export class IfNotNoneTemplate extends PyBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('ifnn', code)
      .description('if expr is not None')
      .replace(`if {{expr}} is not None:\n${this.indentCharacters()}\${0}\n`, position, true)
      .build();
  }
}

export const build = () => [new IfTemplate(), new IfNotTemplate(), new IfNotNoneTemplate()];
