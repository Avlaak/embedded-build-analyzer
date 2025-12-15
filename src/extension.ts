import * as vscode from 'vscode';
import { BuildAnalyzerProvider } from './BuildAnalyzerProvider';

let provider: BuildAnalyzerProvider;

export function activate(context: vscode.ExtensionContext) {
  const cfg = vscode.workspace.getConfiguration('EmbeddedBuildAnalyzer');
  const debug = cfg.get<boolean>('debug') ?? false;

  if (debug) {
    console.log('[Extension] Activating extension...');
  }

  provider = new BuildAnalyzerProvider(context);

  context.subscriptions.push(
    vscode.commands.registerCommand('EmbeddedBuildAnalyzer.refresh', () => {
      if (debug) {console.log('[Extension] Command: refresh');}
      return provider.refresh();
    }),

    vscode.commands.registerCommand('EmbeddedBuildAnalyzer.refreshPaths', () => {
      if (debug) {console.log('[Extension] Command: refreshPaths');}
      return provider.fullRefresh();
    }),

    vscode.window.registerWebviewViewProvider('embeddedBuildAnalyzer', provider)
  );

  if (debug) {
    console.log('[Extension] Commands and WebviewViewProvider registered.');
  }
}

export function deactivate() {
  if (provider) {
    provider.dispose();
  }
}
