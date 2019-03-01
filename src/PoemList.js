import React, { Component } from 'react';
// import firebase from './firebase.js';

class PoemList extends Component {
    // constructor(){
    //     super()
        
    // } // end of constructor{}

    render(){
        return(
            
            <div className="poemCollection">
                <h2>Poem Collection</h2>
                {
                // iterate through this.state.poems.dbPoems 
                this.props.poemList.map((poem, i) =>{
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
            </div> // end poemCollection
            
        )
    }
}

export default PoemList;