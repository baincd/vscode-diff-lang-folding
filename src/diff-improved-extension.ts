import * as vscode from 'vscode';

export class DiffFoldingRangeProvider implements vscode.FoldingRangeProvider {
    onDidChangeFoldingRanges?: vscode.Event<void> | undefined;

    provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FoldingRange[]> {
        let ranges = new Array<vscode.FoldingRange>();
        var previousHeader = -1;
        var previousHunk = -1;
        for (let index = 0; index < document.lineCount && !token.isCancellationRequested; index++) {
            if (document.lineAt(index).text.match(/^diff --git a\/.*$/)) {
                if (previousHunk >= 0) {
                    ranges.push(new vscode.FoldingRange(previousHunk, index - 1, vscode.FoldingRangeKind.Region));
                    previousHunk = -1;
                } else {
                    ranges.push(new vscode.FoldingRange(previousHeader + 1, index - 1, vscode.FoldingRangeKind.Region));
                }
                if (previousHeader >= 0) {
                    ranges.push(new vscode.FoldingRange(previousHeader, index - 1, vscode.FoldingRangeKind.Region));
                }
                previousHeader = index;
            } else if (document.lineAt(index).text.match(/^@@[ \-+,0-9]*@@.*$/)) {
                if (previousHunk >= 0) {
                    ranges.push(new vscode.FoldingRange(previousHunk, index - 1, vscode.FoldingRangeKind.Region));
                } else {
                    ranges.push(new vscode.FoldingRange(previousHeader + 1, index - 1, vscode.FoldingRangeKind.Region));
                }
                previousHunk = index;
            }
        }
        if (previousHeader >= 0) {
            ranges.push(new vscode.FoldingRange(previousHeader, document.lineCount - 1, vscode.FoldingRangeKind.Region));
        }
        if (previousHunk >= 0) {
            ranges.push(new vscode.FoldingRange(previousHunk, document.lineCount - 1, vscode.FoldingRangeKind.Region));
        } else {
            ranges.push(new vscode.FoldingRange(previousHeader + 1, document.lineCount - 1, vscode.FoldingRangeKind.Region));
        }

        return ranges;
    }

}


export function activate(context: vscode.ExtensionContext) {
    let DIFF:vscode.DocumentSelector = { language: 'diff' };

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            DIFF, new DiffFoldingRangeProvider()));
}
