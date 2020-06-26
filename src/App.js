import React, { Component } from "react";
import "./App.css";
import  Button  from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from './components/ClearButton';

class App extends Component{
  constructor(props){
    super(props);

    this.state = {
      Input: ""
    };

  

    //this.handleChange = this.handleChange.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  addToInput = val =>{
    this.setState({input: this.state.input + val});
  };

  submitHandler = e => {
    e.preventDefault() 
  fetch('http://192.168.1.5:3000/calcolatrice', {
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    function: '',
    argomento: this.state,
  })
})
    console.log(this.state)
  };



  render(){
    return(
   <div className="app"> 
    <form onSubmit={this.submitHandler}>
      <div className="calc-wrapper">
        <Input input={this.state.input} name="argomento"></Input>
        <div className="row">
          <Button handleClick={this.addToInput}></Button>
          <Button handleClick={this.addToInput}>sin(</Button>
          <Button handleClick={this.addToInput}>7</Button>
          <Button handleClick={this.addToInput}>8</Button>
          <Button handleClick={this.addToInput}>9</Button>
          <Button handleClick={this.addToInput}>/</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>(</Button>
          <Button handleClick={this.addToInput}>cos(</Button>
          <Button handleClick={this.addToInput}>4</Button>
          <Button handleClick={this.addToInput}>5</Button>
          <Button handleClick={this.addToInput}>6</Button>
          <Button handleClick={this.addToInput}>*</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>exp(</Button>
          <Button handleClick={this.addToInput}>tan(</Button>
          <Button handleClick={this.addToInput}>1</Button>
          <Button handleClick={this.addToInput}>2</Button>
          <Button handleClick={this.addToInput}>3</Button>
          <Button handleClick={this.addToInput}>+</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>sqrt(</Button>
          <Button handleClick={this.addToInput}>log(</Button>
          <Button handleClick={this.addToInput}>.</Button>
          <Button handleClick={this.addToInput}>0</Button>
          <Button /*onClick={()=> this.submitHandler}*/ handleClick={() => this.setState({ input: "" })}
          type="submit">=</Button>
          <Button handleClick={this.addToInput}>-</Button>
        </div>
        <div className="row">
          <Button handleClick={this.addToInput}>tanh(</Button>
          <Button handleClick={this.addToInput}>arctg(</Button>
          <Button handleClick={this.addToInput}>%</Button>
          <ClearButton handleClear={() => this.setState({ input: "" })}>Clear</ClearButton>
          <Button handleClick={this.addToInput}>sinh(</Button>
          <Button handleClick={this.addToInput}>cosh(</Button>
        </div>
      </div>
      </form>
    </div>
    );
  }
}


export default App;
