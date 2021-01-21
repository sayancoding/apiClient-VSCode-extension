// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "apiClient" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('apiClient.fun', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('This\'s just a fun command😂. "apiClient:start" -> to start extension!');
	});
	let htmlShow = vscode.commands.registerCommand('apiClient.start',function(){
		vscode.window.showInformationMessage('api-Client started..');
		let panel = vscode.window.createWebviewPanel(
			"apiClient",
			"api-Client",
			vscode.ViewColumn.One,
			{
				// Enable javascript in the webview
				enableScripts: true,
				// And restrict the webview to only loading content from our extension's `media` directory.
				localResourceRoots: [vscode.Uri.joinPath(context.extensionUri, 'src')]
			}
		);
		panel.webview.html = _getHTML(panel.webview, context.extensionUri);
	})

	context.subscriptions.push(disposable);
	context.subscriptions.push(htmlShow);
}
function _getHTML(webview,extensionUri) {
	
	const styleUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src' ,'style.css'));
	const jsUri = webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'src' ,'app.js'));
	return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Document</title>
				<link rel="stylesheet" href=${styleUri}>
			</head>
			<body>
				<h1>api-Client 🚀</h1>
				<div class="input_area">
					<input type="text" class="url_box" placeholder="..paste URL here">
					<div class="btn_group">
						<button class="btn_get">GET</button>
						<button class="btn_post">POST</button>
						<button class="btn_update">UPDATE</button>
						<button class="btn_delete">DELETE</button>
					</div>
					<div class="check_box">
						<input type="checkbox" name="body-parser" value="true" id="body-parser">
						<label for="body-parser">body-parser-JSON(application/json)</label>
					</div>
					<div class="body_parser_input">
						<textarea name="" id="body-parser-data" cols="80" rows="16"></textarea>
					</div>
				</div>
				<h3 class="res_text">../response 🚩</h3>
				<div class="response_area">
					<p class="len"></p>
					<pre class="response">
					</pre>
				</div>
				<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
				<script src=${jsUri}></script>
			</body>
			</html>
`
}
// @ts-ignore
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	// @ts-ignore
	activate,
	deactivate
}
