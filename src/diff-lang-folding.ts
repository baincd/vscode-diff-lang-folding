import * as vscode from 'vscode';

class DiffFoldingRangeProvider implements vscode.FoldingRangeProvider {
    onDidChangeFoldingRanges?: vscode.Event<void> | undefined;

	// Regexs based on https://github.com/microsoft/vscode/blob/main/extensions/git/syntaxes/diff.tmLanguage.json
	// private static readonly HeaderGitRegEx = /^diff --git a\/.*$/; // Git RegEx isn't necessary - HeaderCmdRegEx will cover it
	private readonly headerCmdRegEx = /^diff (-|\S+\s+\S+).*$/
	private readonly rangeNormalRegEx = /^\d+(,\d+)*(a|d|c)\d+(,\d+)*$/
	private readonly rangeUnifiedRegEx = /^(@@)\s*(.+?)\s*(@@)/
	private readonly rangeContextRegEx = /^(((\-{3}) .+ (\-{4}))|((\*{3}) .+ (\*{4})))$/

    
    provideFoldingRanges(document: vscode.TextDocument, context: vscode.FoldingContext, token: vscode.CancellationToken): vscode.ProviderResult<vscode.FoldingRange[]> {
        let ranges = new Array<vscode.FoldingRange>();
        var previousHeader = -1;
        var previousHunk = -1;
        for (let index = 0; index < document.lineCount && !token.isCancellationRequested; index++) {
            let lineText = document.lineAt(index).text;
            if (lineText.match(this.headerCmdRegEx)) {
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
            } else if (lineText.match(this.rangeUnifiedRegEx) || lineText.match(this.rangeNormalRegEx) || lineText.match(this.rangeContextRegEx)) {
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
    let GIT_COMMIT:vscode.DocumentSelector = { language: 'git-commit'}; // Used when the git config commit.verbose = true

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            DIFF, new DiffFoldingRangeProvider()));

    context.subscriptions.push(
        vscode.languages.registerFoldingRangeProvider(
            GIT_COMMIT, new DiffFoldingRangeProvider()));
}
