import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

export class MapContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
        markers:this.props.markers,
        lat:this.props.lat,
        long:this.props.long
    }
  }

  componentWillReceiveProps(props){

      this.setState(()=>{
          return({
            markers:props.markers,
            lat:props.lat,
            long:props.long
          })
      })
  }

  displayMarkers = () => {
    return this.state.markers.map((marker, i) => {
      return <Marker key={i} id={i} position={{
       lat: marker[1],
       lng: marker[0]
     }}
     onClick={() => console.log("You clicked me!")} />
    })
  }

  render(){
  return (
    <Map
        google={this.props.google}
        zoom={14}
        
        // style={mapStyles}
        initialCenter={{
          lat: this.state.lat,
          lng: this.state.long
         }}
        center={{
         lat: this.state.lat,
         lng: this.state.long
        }}

      >
        {this.displayMarkers()}
      </Map>
  )}
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_TOKEN
  })(MapContainer);

