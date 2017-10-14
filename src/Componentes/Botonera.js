import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import "./Botonera.css";

class Botonera extends Component {
  constructor(props){
    super(props);

    this.getBotonera = this.getBotonera.bind(this);
  }

  getBotonera(){
    return this.props.botones.map((boton, index) => (
      <Button 
              bsStyle={boton.estado == "no-pulsado" ? "primary" : 
                (boton.estado == "pulsado-acertado" ? "success" : "danger")}
              key={index}
              disabled={boton.estado != "no-pulsado" ? true : false }
              onClick={() => this.props.sePulsoBoton(index)}>
        {boton.letra}
      </Button>
    ));
  }

  render() {
    return (
        <div id="botonera">
          {this.getBotonera()}
        </div>
    );
  }
}

export default Botonera;
