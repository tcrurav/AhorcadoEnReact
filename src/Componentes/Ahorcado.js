import React, { Component } from 'react';
import Imagen from './Imagen';
import Botonera from './Botonera';
import PalabraAdivinadaHastaElMomento from './PalabraAdivinadaHastaElMomento';
import Dialog from 'react-bootstrap-dialog';

class Ahorcado extends Component {
  constructor(props){
    super(props);

    this.getBotoneraVacia = this.getBotoneraVacia.bind(this);
    this.sePulsoBoton = this.sePulsoBoton.bind(this);
    this.getPalabraAAdivinar = this.getPalabraAAdivinar.bind(this);
    this.getPalabraAdivinadaHastaElMomento = this.getPalabraAdivinadaHastaElMomento.bind(this);
    this.openModal = this.openModal.bind(this);

    let palabraAAdivinar = this.getPalabraAAdivinar();

    this.state = {
      numFallos: 0,
      numAciertos: 0,
      palabraAAdivinar: palabraAAdivinar,
      palabraAdivinadaHastaElMomento: this.getPalabraAdivinadaHastaElMomento(palabraAAdivinar),
      botones: this.getBotoneraVacia()
    };
  }

  getPalabraAdivinadaHastaElMomento(palabra){
    let guiones = "";
    for(let i = 0; i < palabra.length; i++){
      guiones += "-";
    }
    return guiones;
  }

  getPalabraAAdivinar(){
    let palabras = [ "CARACOLA", "ESPECIMEN", "PERSONA" ];
    let numAleatorio = Math.floor(Math.random() * palabras.length);
    let palabra = palabras[numAleatorio];
    return palabra;
  }

  getBotoneraVacia(){
    let letras = [
      "A", "B", "C", "D", "E", "F", "G",
      "H", "I", "J", "K", "L", "M", "N", 
      "Ñ", "O", "P", "Q", "R", "S", "T", 
      "U", "V", "W", "X", "Y", "Z"
    ];

    let botones = [];

    botones = letras.map((l) => ({ letra: l, estado: "no-pulsado"}));

    return botones;

  }

  sePulsoBoton(i){
    let letra = this.state.botones[i].letra;
    let botonesAux = this.state.botones;

    if(this.hayAcierto(letra)){
      botonesAux[i].estado = "pulsado-acertado";
      this.setState((prevState) => ({
        botones: botonesAux
      }));
    } else {
      botonesAux[i].estado = "pulsado-no-acertado";
      this.setState((prevState) => ({
        numFallos: ++(prevState.numFallos),
        botones: botonesAux
      }));
    }
  }

  componentDidUpdate(){
    if(this.state.numAciertos == this.state.palabraAAdivinar.length){
      this.openModal("¡Ganaste!");
      this.reinicilizar();
    } 
    if(this.state.numFallos == 6){
      this.openModal("¡Perdiste!");
      this.reinicilizar();
    }
  }

  reinicilizar(){
    let palabraAAdivinar = this.getPalabraAAdivinar();
    
    this.setState({
      numFallos: 0,
      numAciertos: 0,
      palabraAAdivinar: palabraAAdivinar,
      palabraAdivinadaHastaElMomento: this.getPalabraAdivinadaHastaElMomento(palabraAAdivinar),
      botones: this.getBotoneraVacia()
    }); 
  }

  hayAcierto(letra){
    let acierto = false;
    for(let i = 0; i < this.state.palabraAAdivinar.length; i++){
      if(this.state.palabraAAdivinar.charAt(i) === letra){
        this.setState((prevState) => ({
          numAciertos: ++(prevState.numAciertos),
          palabraAdivinadaHastaElMomento: 
            prevState.palabraAdivinadaHastaElMomento.substr(0, i) +
            letra +
            prevState.palabraAdivinadaHastaElMomento.substr(i + 1)
        }));
        acierto = true;
      }
    }
    return acierto;
  }

  render() {
    return (
        <div>
          <Imagen numFallos={this.state.numFallos}/>
          <PalabraAdivinadaHastaElMomento 
            PalabraAdivinadaHastaElMomento={this.state.palabraAdivinadaHastaElMomento} />
          <Botonera sePulsoBoton={(i) => this.sePulsoBoton(i)} botones={this.state.botones}/>
          <Dialog ref={(el) => { this.dialog = el }} />
        </div>
    );
  }

  openModal(mensaje){
    this.dialog.show({
      title: mensaje,
      body: 'La palabra era ' + this.state.palabraAAdivinar + ". Pulsa Ok para jugar otra vez",
      actions: [
        Dialog.OKAction()
      ],
      bsSize: 'small',
    })
  }

}



export default Ahorcado;
