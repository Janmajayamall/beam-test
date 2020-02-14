import React from 'react';
import logo from './logo.svg';
import MapContainer from './Components/Map'
import Search from './Components/Search'
import './App.css';
import axios from 'axios';


export class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      long:null,
      lat:null,
      max:null,
      tickers:[]
    }
  }

  searchScooters = async(lat, long, max) =>{
    try{
      let closestScooters = await axios.post(process.env.REACT_APP_API_ENDPOINT+'closestScooters', {
                                                                                'long':parseFloat(long),
                                                                                'lat':parseFloat(lat),
                                                                                'max':parseFloat(max)  
                                                                             });
      let locations = []
      for (let i = 0; i < closestScooters.data.length;i++){
        locations.push(closestScooters.data[i].currentLocation.coordinates)
      }
      this.setState(()=>{
        return({
          tickers:locations,
          lat:lat,
          long:long,
          max:max
        })
      })
      
    }catch(e){
      console.log('Error', e);
    }
    
  }

  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
      this.setState(()=>{
        return({
          long:position.coords.longitude,
          lat:position.coords.latitude,
          max:3
        })
      })
      this.searchScooters(this.state.lat, this.state.long, this.state.max)
    })
  }

  render(){
    return (
      <div>
        {this.state.long!=null ?
        <div>
        <div
        style={styles.main}>
        <Search
          lat={this.state.lat}
          long={this.state.long}
          max={this.state.max}
          searchScooters={this.searchScooters}
          />
        </div>
        <MapContainer
          lat={this.state.lat}
          long={this.state.long}
          markers={this.state.tickers}/>
        </div>
          :
        <div>
          Loading....
        </div>
        }
      </div>

    )
  }

}

export default App;

var styles = {
  'main': {
    margin:'10px',
  },
}