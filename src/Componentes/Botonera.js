import React, { Component } from 'react';
import "./Botonera.css";

class Botonera extends Component {
  constructor(props){
    super(props);

    this.getBotonera = this.getBotonera.bind(this);
  }

  getBotonera(){
    return this.props.botones.map((boton, index) => (
      <button className={boton.estado}
              key={index}
              disabled={boton.estado != "no-pulsado" ? true : false }
              onClick={() => this.props.sePulsoBoton(index)}>
        {boton.letra}
      </button>
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
