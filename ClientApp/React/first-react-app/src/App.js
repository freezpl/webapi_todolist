import React, {Component} from 'react';
import './App.css';

import Car from './components/Car'

// function App() {
//   return (
//     <div>
//       <Car name='Ford' year={2018}/>
//       <Car name='Nissan' year={2018}/>
//     </div>
//   );
// }

class App extends Component {

  state = {cars: [{name: 'Ford', year: 2018},
                  {name: 'Nissan', year: 2013},
  ]};

  render(){
    return (
      <div>
        <Car name={this.state.cars[0].name} year={this.state.cars[0].year}/>
        <Car name='Nissan' year={2018}/>
      </div>
    );
  }
}

export default App;
