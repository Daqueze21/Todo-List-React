import React, {Component} from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
   maxId = 100;
   
   state = { 
      todoData: [
         this.createTodoItem('Drink Coffee'),
         this.createTodoItem('Make Awesome App'),
         this.createTodoItem('Have a lunch')
      ],
      term: '',
      filter: "done"
   };
   //create todoitems for state
   createTodoItem (label) {
      return {
         label,
         important: false,
         done: false, 
         id: this.maxId++
      }
   }

   //delete elem func
   deleteItem = (id) =>{
      this.setState(({todoData}) => {
         const idx = todoData.findIndex((el) => el.id === id); //find element id
         //todoData.splice(idx, 1); //delete element by id //do not use in react

         //const before = todoData.splice(0, idx); // first part of array  
         //const after = todoData.splice(idx + 1); // last part of array

         const newArray = [
            ...todoData.slice(0, idx),
            ...todoData.slice(idx + 1)
          ]; //spred perator merge array
         return {
            todoData : newArray
         }; //return new state
      });  
   };
   
   //add element function 
   AddItem = (text ) => {
      console.log('added', text);
      //generate id
      const newItem = this.createTodoItem(text);
      //add array to state
      this.setState(({todoData}) => {
         const newArr = [
            ...todoData, 
            newItem
         ];
         //return new state
         return {
            todoData: newArr
         }; 
      });
   };

   toggleProperty(arr, id, propName){
      const idx = arr.findIndex((el) => el.id === id);
      // update object

      const oldItem = arr[idx];
      const newItem = {
         ...oldItem,
         [propName]: !oldItem[propName]
      };

      //create new array
      return [
         ...arr.slice(0, idx),
         newItem,
         ...arr.slice(idx + 1)
      ]; //spred оperator merge array
      //return new state
   
   }

   //header todo-done counter function
   onToggleDone = (id) => {
      this.setState(({ todoData }) => {
         return {
            todoData: this.toggleProperty(todoData, id, 'done')
         }; //return new state
      });
      console.log("toggle done", id); 
   };
   onToggleImportant = (id) => {
      this.setState(({
         todoData
      }) => {
         return {
            todoData: this.toggleProperty(todoData, id, 'important')
         };
      });
   }; 
 
   onSearchChange = (term) =>{
      this.setState({term})
   };
    
   onFilterChange = (filter) => {
      this.setState({filter})
   };

   //search function
   search(item, term){
      if (term.lenght === 0) {
         return ItemStatusFilter;
      }
      return item.filter((item) => {
         return item.label
         .toLowerCase()
         .indexOf (term.toLowerCase()) >- 1; 
      });
   } 
   //todo filter  function
   filter (items, filter) {
      switch (filter) {
         case "all" :
            return items;
         case "active" :
            return items.filter((item) => !item.done);
         case "done": 
            return items.filter((item) => item.done);
         default: 
            return items;
      }
   }

   render () {
      const {
         todoData, term, filter
      } = this.state;

      const visibleItems =  this.filter (this.search(todoData, term), filter);
      const doneCount = todoData
            .filter((el) => el.done).lenght;
            console.log(doneCount); //done element counter
      const todoCount = todoData.length - doneCount; 
      console.log(todoCount); //todo elements counter
       
      return (
        //HTML BLOCKS
         <div className="todo-app">
            <AppHeader toDo = {
               todoCount 
            }
            done = {
               doneCount
            }
            />
         <div className ="top-panel d-flex">
            <SearchPanel onSearchChange = {this.onSearchChange} />
            <ItemStatusFilter  
            filter = {filter}
            onFilterChange = {this.onFilterChange}/>
         </div> 

          <TodoList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleImportant={this.onToggleImportant}
            onToggleDone={this.onToggleDone}
          />
          <ItemAddForm onItemAdded={this.AddItem} />
        </div>
      ); 
   };  
};

