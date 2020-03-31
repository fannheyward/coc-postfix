import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { GoBaseTemplate } from './baseTemplate';

export class LenTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('len', code).description('len(expr)').replace(`len({{expr}})`, position, true).build();
  }
}

export const build = () => [new LenTemplate()];
