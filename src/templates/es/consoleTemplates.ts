import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { ESBaseTemplate } from './baseTemplate';

export class ConsoleTemplate extends ESBaseTemplate {
  constructor(private level: 'log' | 'warn' | 'error') {
    super();
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create(this.level, code)
      .description(`console.${this.level}(expr)`)
      .replace(`console.${this.level}({{expr}})`, position)
      .build();
  }
}

export const build = () => [new ConsoleTemplate('log'), new ConsoleTemplate('warn'), new ConsoleTemplate('error')];
