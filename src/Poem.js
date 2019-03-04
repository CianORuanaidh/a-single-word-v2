import React, { Component } from 'react';
import firebase from './firebase.js';

class Poem extends Component {
    // constructor(){
    //     super()
        
    // } // end of constructor{}

    handleSubmit = (event) => {
        // prevent default onSubmit function
        event.preventDefault();
        // connect with firebase database
        const oneWordDBRef = firebase.database().ref('poems');
        
        // push user poem to database
        console.log('poem push');
        console.log(this.props.poem);
        oneWordDBRef.push(this.props.poem);
    }


    render(){
        return (
            <div>
            
            {
                (this.props.poem.length > 1) ? 
                (
            <div className="poemHolder">
              <h2 className="poemTitle">Poem Title</h2>
              <ul>
                {/* Take every line in userPoem and print to page */}
                {
                  this.props.poem.map((line, i) => {
                    return (
                      <li key={i}>
                        {line}
                      </li>
                    )
                  })
                }
              </ul>
              <form action="submit" onSubmit={this.handleSubmit}>
                <label className="visuallyHidden" for="userInput">Enter word to generate poem</label>                    
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
            </div>
                ) : (
                    <h2></h2>
                )
            }
          </div>
        )
    }
}

export default Poem;