import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../completionItemBuilder';
import { BaseTemplate } from './baseTemplates';

export class ReturnTemplate extends BaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('return', code)
      .description(`return expr`)
      .replace('return {{expr}}', position)
      .build();
  }
}

export const build = () => new ReturnTemplate();
