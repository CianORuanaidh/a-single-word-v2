import React, { Component } from 'react';
// import firebase from './firebase.js';

class PoemList extends Component {
    // constructor(){
    //     super()
    // }

    render(){
        console.log('POEM LIST');
        // let poemList = this.props.poemList;
        // console.log(poemList);

        let newList = this.props.poemList.map(poem => {
            const arr = Object.values(poem);
            console.log(arr);
            const arr2 = Object.values(arr);
            return arr2
        });

        let first = Object.values(this.props.poemList);
        console.log(first);

        console.log("new list", newList);

        // poemList.map(poem => {
        //     console.log("inside map");
        //     console.log(Object.values(poem));
        //     const arr = Object.values(poem);
        //     console.log(Object.values(arr));
        //     const arr2 = Object.values(arr);
        //     console.log(Object.values(arr2));
        //     return arr2[0].join(', ')
        // })[0];


        // console.log(this.props.poemList);

        // let poemList = this.props.poemList;
        // console.log(poemList);

        // let array = this.props.poemList.map((poem) =>{
        //     // console.log(poem);
        //     return Object.values(poem)
        // });

        // console.log(array.val());

        // this.props.poemList.map(poem => {
        //     console.log("inside map");
        //     console.log(Object.values(poem));
        //     const arr = Object.values(poem);
        //     console.log(Object.values(arr));
        //     const arr2 = Object.values(arr);
        //     console.log(Object.values(arr2));
        //     return arr2[0].join(', ')
        // });

        // console.log(typeof(this.props.poemList));
        // console.log(this.props.poemList['0']);
        return(
            
            <div>
                <h4>This is List of POEM</h4>
                <ul>
                {/* Take every line in userPoem and print to page */}
                {
                    // console.log("print poem list")

                    // this.props.poemList.forEach(() => {

                    // })

                    // this.props.poemList.forEach(() =>{
                    //     console.log("hellllooooooooo")
                    //     return(
                    //             'poem'
                    //     )
                    // })


                    // this.props.poemList.map((line, i) => {
                    //     return (
                    //       <li key={i}>
                    //         {line}
                    //       </li>
                    //     )
                    //   })
                    

                    //   console.log(this.props.poemList['-LZq1IG2-oELXIW0QLWY'])
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