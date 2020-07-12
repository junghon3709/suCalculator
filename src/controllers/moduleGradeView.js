import React from 'react';
import ReactDOM from 'react-dom';
import gradeCAP from '../res/gradeCAP.js'

class ModuleGradeView extends React.Component{
	constructor(props){
		super(props)
		this.state = {
	      moduleCode: "",
	      errModuleCode: "",
	      moduleGrade: "A+",
	      modsData: [],
	      error: 'falseStyle'
	    }
	this.checkMods = this.checkMods.bind(this)
	this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount(){
    fetch("https://api.nusmods.com/v2/2020-2021/moduleList.json")
       // .then(res => res.json)
       .then(res => res.json())
       .then(res => res.map(item => item['moduleCode']))
       .then(res => {
         const modData = res
         this.setState({modsData: modData})
       })
  	}

	checkMods(upperValue){
	    for (let i = 0; i < this.state.modsData.length; i++) {
	        if(this.state.modsData[i].includes(upperValue)){
	          return this.state.modsData[i]
	        } 
	      }
	    return false
	  }
	
	handleChange(event){
		const {name, value, type, target} = event.target
		if(name === 'moduleGrade'){
			this.setState({[name]: value})
		}
		if(name === 'moduleCode'){
		const upperValue = value.toUpperCase()
		this.setState({[name]: upperValue})
		if(upperValue.length >= 6){
		if(this.state.modsData.includes(upperValue)){
		  this.setState({errModuleCode: upperValue + ' is available.'})
		  this.setState({error: 'falseStyle'})
		} else {
		    if(this.checkMods(upperValue)!=false){
		       this.setState({errModuleCode: 'Did you mean: ' + this.checkMods(upperValue) + '?'} )
		       this.setState({error: 'errorStyle'})
		    } else{
		      this.setState({errModuleCode: upperValue + ' not offered this AY.'})
		      this.setState({error: 'errorStyle'})
		    }
		}
		} else{
		this.setState({errModuleCode: ''})
			}
		}
	}


	render(props){
		const gradeCAP_ = gradeCAP.map(item => <option>{item['grade']}</option>)
	    const modsData_ = this.state.modsData.map(item => <option>{item}</option>)
		return(
			<div>
				<div className="module-select">
					<input type="text" value={this.state.moduleCode} name="moduleCode" className="form-input-module" onChange={this.handleChange}/>
				</div>
				<div className="module-grade">
					<select className="form-control" value={this.state.moduleGrade} onChange={this.handleChange} name="moduleGrade">
					{gradeCAP_}
					</select>
				</div>
				<div className="form-error-module">
				<p className={this.state.error}>
				{this.state.errModuleCode}
				</p>
				</div>
			</div>

		)
	}
}

export default ModuleGradeView;