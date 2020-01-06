import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { GoBaseTemplate } from './baseTemplate';

export class ForrTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('forr', code)
      .description('for k, v := range kvs')
      .replace(`for \${1:index}, \${2:item} := range {{expr}} {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export class ForkTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('fork', code)
      .description('for k := range kvs')
      .replace(`for \${1:key} := range {{expr}} {\n${this.indentCharacters()}\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [new ForrTemplate(), new ForkTemplate()];
