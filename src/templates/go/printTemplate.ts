import { Position } from 'vscode-languageserver-protocol';
import { CompletionItemBuilder } from '../../completionItemBuilder';
import { GoBaseTemplate } from './baseTemplate';

export class PrintlnTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('println', code)
      .description(`fmt.Println(expr)`)
      .replace(`fmt.Println({{expr}})`, position, true)
      .build();
  }
}

export class PrintfTemplate extends GoBaseTemplate {
  buildCompletionItem(code: string, position: Position) {
    return CompletionItemBuilder.create('printf', code)
      .description(`fmt.Printf(expr)`)
      .replace(`fmt.Printf("%+v\\n", \${0:{{expr}}})`, position, true)
      .build();
  }
}

export const build = () => [new PrintlnTemplate(), new PrintfTemplate()];
