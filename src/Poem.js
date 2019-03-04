import React, { Component } from 'react';
import firebase from './firebase.js';

class Poem extends Component {
    constructor(props){
        super(props)
        this.state  = {
          poemTitle: "",
          poemAuthor: "",
          canSubmit: true
        }
    } // end of constructor{}


    handleSubmit = (event) => {
        console.log(event);
        // prevent default onSubmit function
        event.preventDefault();
        // update poem title
        this.props.poem[0] = this.state.poemTitle;
        // add author
        this.props.poem.push("Author: " + this.state.poemAuthor);
        // connect with firebase database
        const oneWordDBRef = firebase.database().ref('poems');
        // push user poem to database
        oneWordDBRef.push(this.props.poem);
        // set canSubmit to be flase to remove saved poem
        this.setState({
          canSubmit: false
        });
    }
  
    // function that runs onChange (whenever a change occurs in inputs)
    handleChange = (changeEvent) => {
      this.setState({
        [changeEvent.target.name]: changeEvent.target.value
      })
    }

    handleClick = () =>{
      console.log("CLICKED");
    }

    render(){
        return (
            <div>            
            {
                (this.props.poem.length > 1 && this.state.canSubmit) ? 
                (
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
              <form action="submit" onSubmit={this.handleSubmit}>
                <label className="visuallyHidden" htmlFor="">Add Title to Poem</label>                    
                <input 
                    id="poemTitle"
                    type="text" 
                    placeholder="Poem title:"
                    onChange={this.handleChange}
                    name="poemTitle"
                    value={this.state.poemTitle}
                    required/>
                <input 
                    id="poemAuthor"
                    type="text" 
                    placeholder="Authors name:"
                    onChange={this.handleChange}
                    name="poemAuthor"
                    value={this.state.poemAuthor}
                    required/>
                
                <button type="submit" value="save">Save poem</button>
              </form>
              <button className="tryAgain" onClick={this.handleClick}>Try again?</button>
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