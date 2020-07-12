import React, { Component } from 'react';
import './App.css';
import FadeIn from 'react-fade-in';
import capError from './controllers/capError.js'
import gradeCAP from './res/gradeCAP.js'
import ModuleGradeView from './controllers/moduleGradeView.js'

class App extends Component {
  constructor(){
    super()
    this.state = {
      cap: "",
      errorCap: "",
      noMods: "",
      errorMods: "",
      modsData: [],
      moduleCode: "",
      errModuleCode: "",
      moduleGrade: "A+",
    }
    this.handleChange = this.handleChange.bind(this)
  }


  handleChange(event){
    const {name, value, type, target} = event.target
    if(name === 'cap'){
      this.setState({errorCap: capError(value)})
      this.setState({[name]: value})
    }
  }
  render(){
    return(
      <div class="container">
        <div class="col-md-8 formBox">
        <FadeIn>
          <div>
          <h1>Which mod should I SU?</h1>
          </div>

        <form>
          <div className="form-group">
              <label className="form-title">Current GPA:</label>
                <input type="text" value={this.state.cap} className="form-input" name="cap" onChange={this.handleChange}/>
              <span className="form-help">
                Up to last semester's modules.
              </span>
              <p className="form-error">
                {this.state.errorCap}
              </p>
            </div>
           <br/>
          <div className="form-group">
              <label className="form-title">Cumulative Number of Modules:</label>
                <input type="text" value={this.state.noMods} className="form-input" name="noMods" onChange={this.handleChange}/>
              <span className="form-help">
                Up to last semester's modules.
              </span>
              <p className="form-error">
                {this.state.errorMods}
              </p>
            </div>

           <br/>
           
           <div className="module-text-code">
              <label className="form-title">Module Code</label>
           </div>

           <div className="module-text-grade">
              <label className="form-title">Grade</label>
           </div>

           <ModuleGradeView></ModuleGradeView>

        </form>

        </FadeIn>
        </div>
      </div>



    
      );
  }
}

export default App;