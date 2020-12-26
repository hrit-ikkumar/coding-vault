import React, {Component} from 'react'
import {UnControlled as CodeMirror} from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/theme/monokai.css';
import Submit_Component from './Submit_Component'
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/anyword-hint.js');
require('codemirror/addon/hint/javascript-hint');
require('codemirror/addon/hint/show-hint');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');

var defaults = {
  c:  '#include <stdio.h>\n int main()\n { \n   printf(\"Hello World\");\nreturn 0;\n }',
  cpp: '#include <iostream>\n  int main()\n {  \n    std::cout << \"Hello World!\";\n     return 0;\n }',
  java: 'public class Simple{  public static void main(String args[]){  System.out.println(\"Hello Java\");  }  }  ',
  javascript: 'console.log("Hello World");',
  python:'print("Hello World!")'
};


class Codemirror_Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: defaults.c,
      theme:'material',
      mode: 'c',
      source_code:defaults.c,
      test_cases:'\n'
    };
  }
     
	updateCode (newCode) {
    console.log(newCode); 
		this.setState({
			code: newCode
		});
	}
  changeMode (e) {
    console.log(e.target.value);
    var mode = e.target.value;
    this.setState({
      code: defaults[mode],
      mode: mode
    });
  }
  changeTheme (e){
    var theme = e.target.value;
    this.setState({
      theme:theme
    });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    //  localhost:8000/python
    let router_end_point;
    if(this.state.mode == 'java')
      router_end_point = '/java';
    else if(this.state.mode == 'python')
      router_end_point = '/py';
    else if(this.state.mode == 'c')
      router_end_point = '/c';
    else if(this.state.mode == 'cpp')
      router_end_point = '/cpp';
    else if(this.state.mode == 'javascript')
      router_end_point = '/js';
    else // by default javascript language
      router_end_point = '/js';
    let baseUrl = 'https://coding-vault.herokuapp.com';
    fetch(baseUrl + router_end_point, {
      method: 'POST',
      // We convert the React state to JSON and send it as the POST body
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin'
    }) 
    .then(response => response.json())
    .then(data => 
      {
        console.log(data);
        document.getElementById('program_output').innerHTML = JSON.stringify(data);
      });    
  }
  render(){ 
  var options = {
    lineNumbers: true,
    mode: this.state.mode,
    theme:this.state.theme,
    extraKeys: {"Ctrl": "autocomplete"}
  };
  return (
      <div>
        <CodeMirror
          value={this.state.code} 
          onChange={this.updateCode}
          options={options}
          onChange={(editor, data, value) => {
            this.setState({
                source_code:value
            }); 
          }}
        />
        <div style={{ margin: 10 }}>
          <select onChange={this.changeMode.bind(this)} value={this.state.mode}>
            <option value="c">C</option>
            {/*<option value="cpp">CPP</option>
            <option value="java">Java</option> */}
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
          </select>
          <select onChange={this.changeTheme.bind(this)} value={this.state.theme}>
            <option value="material">Material</option>
            <option value="monokai">Monokai</option>
          </select>
        </div>

        <form  onSubmit={this.handleSubmit}>
          <button type="submit" >Submit Code</button>
        </form>

        <div>
          <p>{this.state.source_code}</p>
        </div>

        <div>
          <h5>Output: </h5>
          <p id="program_output"></p>
        </div>
      </div>
    ); 
  }
}
export default Codemirror_Component;