import React from 'react'
import './index.css'
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools'

const languages = [
	'javascript',
	'java',
	'python',
	'ruby',
	'mysql',
	'golang',
	'csharp',
	'typescript',
];

const themes = [
	'monokai',
	'github',
	'tomorrow',
	'kuroir',
	'twilight',
	'xcode',
	'textmate',
	'solarized_dark',
	'solarized_light',
	'terminal',
];

languages.forEach(lang => {
	require(`brace/mode/${lang}`);
	require(`brace/snippets/${lang}`);
});

themes.forEach(theme => {
	require(`brace/theme/${theme}`);
});

class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: `function onLoad(editor) {\n\tconsole.log("Start typing...");\n}`,
			theme: 'monokai',
			mode: 'javascript',
		}
		this.setTheme = this.setTheme.bind(this);
		this.setMode = this.setMode.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	onChange(newValue) {
		console.log(newValue);
	}

	setTheme(e) {
		this.setState({
			theme: e.target.value,
		});
	}
	setMode(e) {
		this.setState({
			mode: e.target.value,
		});
	}

	render() {
		return (
			<div className="editorClass" >
				<select name="mode" onChange={this.setMode} value={this.state.mode}>
					{languages.map(lang => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
				<br />
				<select name="Theme" onChange={this.setTheme} value={this.state.theme}>
					{themes.map(lang => (
						<option key={lang} value={lang}>
							{lang}
						</option>
					))}
				</select>
				<br />
				<AceEditor
					name="editor1"
					mode={this.state.mode}
					theme={this.state.theme}
					value={this.state.mode === 'javascript' ? this.state.value : ''}
					fontSize={14}
					showGutter={true}
					wrapEnabled={true}
					highlightActiveLine={true}
					showPrintMargin={true}
					focus={true} // to focus on editor automatically when page loads
					readOnly={false} // to make read only instance. it will be helpful when we just want listeners to juse see the code.
					onLoad={this.onLoad}
					onChange={this.onChange}
					onPaste={this.onPaste}

					setOptions={{
						enableBasicAutocompletion: true,
						enableLiveAutocompletion: true,
						enableSnippets: false,
						showLineNumbers: true,
						tabSize: 4,
					}}
					editorProps={{ $blockScrolling: Infinity }}
				/>
			</div >
		)
	}

}

export default Editor