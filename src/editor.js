import React from 'react'
import AceEditor from 'react-ace';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/ext/language_tools'

const languages = [
	'javascript',
	'java',
	'python',
	'ruby'
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

const extensions = {
	python: 'py',
	java: 'java',
	javascript: 'js',
	ruby: 'rb'
}

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
			value: '',
			theme: 'monokai',
			mode: 'javascript',
		}
		this.setTheme = this.setTheme.bind(this);
		this.setMode = this.setMode.bind(this);
		this.onChange = this.onChange.bind(this);
		this.saveFile = this.saveFile.bind(this);
		this.props.socket.on('RECEIVE_MESSAGE', (data) => {
			this.setState({ value: data })
		})
		this.props.socket.on('RECEIVE_NEW_LANGUAGE', (data) => {
			console.log(data)
			if (data)
				this.setState({ mode: data })
		})
	}

	onChange(newValue) {
		this.setState({ value: newValue })
		this.props.handleChange(newValue)
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
		this.props.socket.emit('CHANGED_LANGUAGE', e.target.value)
	}

	saveFile() {
		var newElement = document.createElement('a')
		var newFile = new Blob([this.state.value], { type: 'text/plain' })
		newElement.href = URL.createObjectURL(newFile)
		newElement.download = `code.${extensions[this.state.mode]}`
		newElement.click()
	}



	render() {
		return (
			<div>
				<form className="form-inline">
					<div className="input-group mb-3 col-4">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputGroupSelect01">Language</label>
						</div>
						<select name="mode" onChange={this.setMode} value={this.state.mode} className="custom-select" id="inputGroupSelect01">
							{languages.map(lang => (
								<option key={lang} value={lang}>
									{lang}
								</option>
							))}
						</select>
					</div>

					<div className="input-group mb-3 col-4">
						<div className="input-group-prepend">
							<label className="input-group-text" htmlFor="inputGroupSelect02">Theme</label>
						</div>
						<select name="Theme" onChange={this.setTheme} value={this.state.theme} className="custom-select" id="inputGroupSelect02">
							{themes.map(theme => (
								<option key={theme} value={theme}>
									{theme}
								</option>
							))}
						</select>
					</div>
					<div className="input-group mb-3 col-3">
						<div>
							<button type="button" className="btn btn-info" onClick={this.saveFile}>Download Code</button>
						</div>
					</div>

					<div className="editor">
						<AceEditor
							name="editor"
							mode={this.state.mode}
							theme={this.state.theme}
							height="inherit"
							width="inherit"
							value={this.state.value}
							fontSize={14}
							showGutter={true}
							wrapEnabled={true}
							highlightActiveLine={true}
							showPrintMargin={true}
							focus={true} // to focus on editor automatically when page loads
							readOnly={false} // to make read only instance. it will be helpful when we just want listeners to juse see the code.
							onLoad={this.onLoad}
							onChange={this.onChange}

							setOptions={{
								enableBasicAutocompletion: true,
								enableLiveAutocompletion: true,
								enableSnippets: false,
								showLineNumbers: true,
								tabSize: 4
							}}
							editorProps={{ $blockScrolling: Infinity }}
						/>
					</div>
				</form>
			</div>
		)
	}

}

export default Editor