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
        oneWordDBRef.push(this.props.poem);
    }


    render(){
        return (
            <div className="poemHolder">
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
            {
                (this.props.poem.length > 1) ? 
                (
            <form action="submit" onSubmit={this.handleSubmit}>
              <button type="submit">Save poem</button>
            </form>
                ) : (
                    <h1>Holder</h1>
                )
            }
          </div>
        )
    }
}

export default Poem;