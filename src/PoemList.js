import React, { Component } from 'react';
// import firebase from './firebase.js';

class PoemList extends Component {
    // constructor(){
    //     super()
    // }

    render(){
        console.log('POEM LIST');

        let poemsOut = this.props.poemList.map((poem)=>{
            let poemVal = Object.values(poem)[0];
            return poemVal;
        });
        console.log("poemsOut", poemsOut);

        poemsOut.forEach((poem)=>{
            poem.forEach((line)=>{
                console.log(line);
            });
            console.log('\n\n\n\n\n');
        })

        return(
            
            <div>
                <h4>This is List of POEMs</h4>
                <ul>
                {/* Take every line in userPoem and print to page */}
                {
                    poemsOut.forEach(() =>{
                        return(
                                <li>line</li>
                        )
                    })
                }
                </ul>
            </div>
            
        )
    }
}

export default PoemList;

 // this.props.poemList.map(poem => {
        //     console.log("inside map");
        //     console.log(Object.values(poem));
        //     const arr = Object.values(poem);
        //     console.log(Object.values(arr));
        //     const arr2 = Object.values(arr);
        //     console.log(Object.values(arr2));
        //     return arr2[0].join(', ')
        // })[0];

        // temp0.map(poem => {
        //     const arr = Object.values(poem);
        //     const arr2 = Object.values(arr);
        //     console.log(Array.isArray(arr2))
        //     return arr2
        //   })[0]