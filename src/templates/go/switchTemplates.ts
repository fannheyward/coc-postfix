import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { GoBaseTemplate } from './baseTemplate';

export class SwitchTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('switch', code)
      .description('switch expr')
      .replace(`len({{expr}})`, position, true)
      .replace(`switch \${1:{{expr}}} {\n\tcase \${2:condition}:\n\t\${0}\n}`, position, true)
      .build();
  }
}

export const build = () => [new SwitchTemplate()];
