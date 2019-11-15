import React, {Component} from 'react';

// export default () =>{
//     return(
//     <h3>Car: <strong>{1+1}</strong> </h3>

//     );
// }

export default class Car extends Component
{

    constructor(props){
        super(props);
    }

    state = { cnt : false };

    render(){
        return(
            <div>
            <h3>Car: <strong>{this.props.name}</strong> </h3>
            <h5>Year: <strong>{this.props.year}</strong> </h5>
            </div>
            );
    };
}