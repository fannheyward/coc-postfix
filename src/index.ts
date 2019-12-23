import { ExtensionContext, languages, workspace } from 'coc.nvim';
import { PostfixCompletionProvider } from './postfixCompletionProvider';

const DOCUMENT_SELECTOR: string[] = ['typescript', 'javascript'];

export async function activate(context: ExtensionContext): Promise<void> {
  workspace.showMessage(`coc-postfix works!`);
  const provider = new PostfixCompletionProvider();
  context.subscriptions.push(languages.registerCompletionItemProvider('Postfix Completion', 'PFC', DOCUMENT_SELECTOR, provider));
}

