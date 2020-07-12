import React, { Component } from 'react';
import './App.css';
import FadeIn from 'react-fade-in';
import capError from './controllers/capError.js'
import gradeCAP from './res/gradeCAP.js'

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
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    fetch("https://api.nusmods.com/v2/2020-2021/moduleList.json")
       // .then(res => res.json)
       .then(res => res.json())
       .then(res => res.map(item => item['moduleCode']))
       .then(res => {
         const modData = res
         console.log(modData[0])
         this.setState({modsData: modData})
       })

  }

  handleChange(event){
    const {name, value, type, target} = event.target
    if(name === 'cap'){
      this.setState({errorCap: capError(value)})
      this.setState({[name]: value})
    }
    if(name === 'moduleCode'){
      const upperValue = value.toUpperCase()
      this.setState({[name]: upperValue})
      if(upperValue.length >= 6){
        if(this.state.modsData.includes(upperValue)){
          this.setState({errModuleCode: upperValue + ' is available.'})
        } else {
          this.setState({errModuleCode: upperValue + ' not found or not offered this AY.'})
        }
      }else{
        this.setState({errModuleCode: ''})
      }

    }

  }
  render(){
    const gradeCAP_ = gradeCAP.map(item => <option>{item['grade']}</option>)
    const modsData_ = this.state.modsData.map(item => <option>{item}</option>)

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



            <div className="module-select">
              <input type="text" value={this.state.moduleCode} name="moduleCode" className="form-input-module" onChange={this.handleChange}/>
            </div>
            <div className="module-grade">
              <select className="form-control">
                {gradeCAP_}
              </select>
            <p className="form-error">
                {this.state.errModuleCode}
             </p>
            </div>

        </form>

        </FadeIn>
        </div>
      </div>



    
      );
  }
}

export default App;