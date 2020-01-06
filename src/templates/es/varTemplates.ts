import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { ESBaseTemplate } from './baseTemplate';

export class VarTemplate extends ESBaseTemplate {
  constructor(private keyword: 'var' | 'let' | 'const') {
    super();
  }

  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create(this.keyword, code)
      .description(`${this.keyword} name = expr`)
      .replace(`${this.keyword} \${1:name} = {{expr}}$0`, position, true)
      .build();
  }
}

export const build = () => [new VarTemplate('var'), new VarTemplate('let'), new VarTemplate('const')];
