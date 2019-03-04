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
      dbPoems: [],
      userMessage: "",
      badInput: false
    } // end this.state
  } // end of constructor()


  // function to access poetry api & return object
  getPoems = () => {

    //////////////// INPUT CHECKKING ////////////////////////

    // remove potential leading/trailing white space
    let userInput = this.state.searchWord.trim().toLocaleLowerCase();
    let inputRegex = /[^A-Za-z0-9]/;

    // check to see if word is at least 3 letters long
    if (userInput.length > 2) {

      // test to see if input contains whitespace (is two words)
      // regex conditional solution found here - https://stackoverflow.com/questions/1731190/check-if-a-string-has-white-space
      if (/\s/g.test(userInput) === true ){
        this.setState({
          userMessage: "Please enter only one word",
          userPoem: [],
          badInput: true
        });
        return "Please enter only one word";

      // test for special characters
      } else if (inputRegex.exec(userInput) !== null){
        this.setState({
          userMessage: "No special characters please",
          userPoem: [],
          badInput: true
        });
        return "No special characters please";

      // input is good - send API request
      } else {

        // set isLoading to be true to update DOM
        this.setState({
          isLoading: true,
        });
        axios.get(`http://poetrydb.org/lines/${userInput}/lines.json`)
          .then((result) => {
            // collect result object and store in a variable
            let sourceText = result.data;
    
            if (sourceText.status === 404) {
              this.setState({
                isLoading: false,
                searchWord: "",
                badInput: true,
                userMessage: "Sorry no results try again?"
              });
              return "Sorry no results try again?"
            }

            this.setState({
              badInput: false
            });
    
            // decalare local variables
            let containsWordLines = []; 
            let doesNotContainWordLines = [];
            let generatedPoem = ["title"];
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
    
            // we have data to return, update isLoading to be false
            // update userPoem, clear search word
            this.setState({
              isLoading: false,
              userPoem: generatedPoem,
              searchWord: ''
            });
    
          }); // end of then
      } // end of nested else
    } else {
      console.log("Word must be at least three letters");
      this.setState({
        userMessage: "Word must be at least three letters",
        userPoem: [],
        badInput: true
      });
    }
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
        <header className="wrapper">
          <h1>One Word</h1>
          {/* <h2 className="subHead">Create a poem mash-up based on one word</h2> */}
          <h2 className="appInfo">Enter a single word below. Using that word, we create a poem for you
             using lines from the back catalog of classic poets.</h2>
          {/* <p>Each line in your poem appers in a poem that contains the word you entered.</p> */}

          {
          // check to see if api is 'loading'
          this.state.isLoading ? 
          (
            // if 'loading' return message
            <div className="loadingScreen">Loading</div>
          ) : (      
            // if NOT 'loading' return for to resubmit
            /* form to handle input from user */
            <form className="inputForm" action="submit" onSubmit={this.handleSubmit}>                         
              {/* text input with name 'searchWord'
                  value is this.state.searchWord */}
              <label className="visuallyHidden" for="userInput">Enter word to generate poem</label>                    
              <input 
                id="userInput"
                type="text" 
                placeholder="enter one word"
                onChange={this.handleChange}
                name="searchWord"
                value={this.state.searchWord}/>
              <button type="submit">
                get poem
              </button>
              {
                this.state.badInput ? (
                  <p className="inputCheck">{this.state.userMessage}</p>
                ) : (
                  <p></p>
                )
              }
            </form>

          )
          }

        </header>
        <main className="wrapper">

          {/* HEEEEERRRRRRRRR */}
          
          {/* <div class="poemHolder">
            <h2 className="poemTitle">Poem Title</h2>
            <ul><li>Through summer's gold, or winter's cold, It's I will walk with you.</li><li>They guarded silence, when Oceanus</li><li>And I was then not what I seem,</li><li>By living wings high overhead</li><li>That wills to conquer my defenceless brow</li><li>His beak in poison not his own, tears up</li><li>One hazel lost a leaf of gold</li><li>With love that scorned return sought to unbind</li><li>Consider then, and judge me in this light;</li><li>On the bleak strand, while winter o'er the main</li></ul>
            <form action="submit">
            <input 
                  id="userInput"
                  type="text" 
                  placeholder="enter one word"
                  onChange={this.handleChange}
                  name="title"
                  value="title"/>
              <input 
                  id="userInput"
                  type="text" 
                  placeholder="enter one word"
                  onChange={this.handleChange}
                  name="author"
                  value="author"/>
            <button type="submit">Save poem</button> 
            </form>
          </div>*/}
          {/* HEEEEERRRRRRRRR */}
          <Poem poem={this.state.userPoem}/>
          <PoemList poemList={this.state.dbPoems}/>

        </main>

      </div> // end of App
    );
  }
}

export default App;
