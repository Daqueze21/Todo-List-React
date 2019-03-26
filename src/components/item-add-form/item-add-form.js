import React, { Component } from 'react';

import './item-add-form.css'

export default class ItemAddForm extends Component {
   
   state = {
      label: ""
   };

   onLabelChange = (event) => {
      this.setState({
         label: event.target.value //receive user value from input and transmit to state
      });
   };
   //result processing
   onSubmit = (event) => {
      event.preventDefault(); //shutdown page reload when form submit
      this.props.onItemAdded(this.state.label);
      this.setState({label: ""})//clear label after submit 
   }; //user can add own item 

   render() {
      return (
         <form className = "item-add-form d-flex " 
               onSubmit = {this.onSubmit}>
         
            <input type ='text'
               className = 'form-control' 
               onChange = {this.onLabelChange} //ivent listener
               placeholder = 'What to need to do' 
               value = {this.state.label}/>
            <button className = 'btn btn-outline-secondary add-btn'>
               Add Item
            </button>
         </form>
      )
   } 
};




 