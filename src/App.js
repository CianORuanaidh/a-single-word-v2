import React, { Component } from 'react';
import axios from 'axios';
import Poem from './Poem.js'
import firebase from './firebase';

import './App.css';
import PoemList from './PoemList.js';

class App extends Component {
  constructor() {
    super()
    this.state = {
      searchWord: '',
      isLoading: false,
      userPoem: [],
      dbPoems: []
    } // end this.state
  } // end of constructor()


  // function to access poetry api & return object
  getPoems = () => {
    console.log(this.state.searchWord);
    // set isLoading to be true to update DOM
    this.setState({
      isLoading: true,
    });
    axios.get(`http://poetrydb.org/lines/${this.state.searchWord}/lines.json`)
      .then((result) => {
        console.log(result);
        // collect object of result and store in a variable
        let sourceText = result.data;

        // decalare other local variables
        let containsWordLines = []; 
        let doesNotContainWordLines = [];
        let generatedPoem = [];
        let line = 0;

        // delcare RegEx to check strings
        let regex = /[!@#$%^&*()_?:{}|<>[]/;

        
        // iterate through 'sourceText' object
        sourceText.forEach((poem)=>{
          
          // each poem is an array of lines
          // iterate through each poem
          poem['lines'].forEach((line)=>{

            if(line !== ''){               
            // if line is not an empty string
                if (!regex.exec(line)){
                // if line does not contain special character
                if(line.includes(this.state.searchWord) === true){
                  // if line contains searched word, push to containsWordLines[] array
                  containsWordLines.push(line);
                } else {
                  // if line does not contain searched word, push to doesNotContainWordLines[] array
                  doesNotContainWordLines.push(line);
                }
              }
            }

          });
        });

        // declare lenths of arrays as varialbes
        let numberOfContainesLines = containsWordLines.length;
        let numberOfDoesNotContaineLines = doesNotContainWordLines.length;
        
        // create 10 line poem
        for (let i = 0; i <10; i ++){
          if (i === 0 || i === 9) {
            // for 1st and last lines
            // push randomly selected line with user input to to 'generatedPoem' array
            line = Math.floor((Math.random() * numberOfContainesLines));
            generatedPoem.push(containsWordLines[line].trim());
          } else {
            // push randomly selected line without user input to to 'generatedPoem' array
            line = Math.floor((Math.random() * numberOfDoesNotContaineLines));
            generatedPoem.push(doesNotContainWordLines[line].trim());
          }
        }
        // console.log(generatedPoem);

        // we have data to return
        // update isLoading to be false
        // update userPoem
        // clear search word
        this.setState({
          isLoading: false,
          userPoem: generatedPoem,
          searchWord: ''
        });

      });

  } // end getPoems


  handleSubmit = (event) => {
    // prevent default action on submit
    event.preventDefault();
    // call function to get poems - getPoems()
    this.getPoems();
  }

  // function that runs onChange (whenever a change occurs)
  handleChange = (changeEvent) => {
    // console.log(changeEvent.target.value);
    // update state's searchWord with value from changeEvent
    this.setState({
      [changeEvent.target.name]: changeEvent.target.value
    })


  }

  componentDidMount(){
    // connect with 'poems' obj in firebase database
    const oneWordDBRef = firebase.database().ref('poems');

    oneWordDBRef.on('value', (response) => {
      // create variable to hold data
      let data = response.val();

      // create array to hold returned objects
      let newState = [];

      for(let poemKey in data){
        // store vaules in newState array
        newState.push([
          poemKey,
          data[poemKey]
        ]);
      } 

      // setState of this.state.dbPoems to newState array
      this.setState({
        dbPoems: newState
      })
    });

  }


  render() {
    return ( 
      <div className="App">

        <h1>One Word</h1>
        <h2>Create a poem mash up based on one word</h2>
        

        {
          // check to see if api is 'loading'
          this.state.isLoading ? 
          (
            // if 'loading' return message
            <div>Loading</div>
          ) : (      
            // if NOT 'loading' return for to resubmit
            /* form to handle input from user */
            <form action="submit" onSubmit={this.handleSubmit}>                         
              
              {/* text input with name 'searchWord'
                  value is this.state.searchWord */}                    
              <input type="text" 
                placeholder="enter one word"
                onChange={this.handleChange}
                name="searchWord"
                value={this.state.searchWord}/>

              <button type="submit">
                get poem
              </button>

            </form>
          )
        }

        <Poem poem={this.state.userPoem}/>

        <div className="poemCollection">
          <h2>Poem Collection</h2>
        </div> {/* END div.poemCollection  */}
          {
            // iterate through this.state.poems.dbPoems 
              this.state.dbPoems.map((poem, i) =>{
                let poemClass = `poem poem${i}`
                return(
                  // return unorderd list that will contain poem lines
                  <ul key={poem[0]} className={poemClass}>
                  <li><h2>Poem Title</h2></li>
                  {
                    // iterate through each poem and return list of lines
                    poem[1].map((line, i)=>{
                      return(
                        <li key={i}>
                          {line}
                        </li>
                      )
                    })                          
                    }                        
                  </ul>
                )              
              })
          }
        {/* <PoemList poemList={this.state.dbPoems}/> */}
      </div>
    );
  }
}

export default App;
