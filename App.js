import React, { Component } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, } from "react-native";
import Database from './source/DataBase/Database';
import Tarefa from './source/Models/Tarefa.js';
import TarefaComponent from './source/Components/TarefaComponent'


export default class App extends Component {


  constructor(props) {
    super(props)
    this.state = {
      tarefa: " ",
      detalhes: " ",
      data: " ",
      situacao: " ",
      lista: []
    }
    this.Listar()
  }


  Listar = () => {
    const banco = new Database();
    banco.Listar().then(
      listaCompleta => {
        this.setState({ lista: listaCompleta })
      }
    )
  }

  Cadastrar = (tarefa, detalhes, data, situacao) => {
    const itemNovo = new Tarefa(tarefa, detalhes, data, situacao);
    const banco = new Database();
    banco.Adicionar(itemNovo);
    this.Listar();
  }

  AtrasarSituacao = (id) => {
    const banco = new Database();
    banco.Atrasar(id);
    this.Listar();
  }

  AdiantarSituacao = (id) => {
    const banco = new Database();
    banco.Adiantar(id);
    this.Listar();
  }

  DeletarTarefa = (id) => {
    const banco = new Database();
    banco.Deletar(id);
    this.Listar();
  }

  render() {
    return (
      <ScrollView>
        <View style={estilo.background}>
          <View style={estilo.titulo}>
            <Text style={estilo.textoTitulo}>Organizador de Tarefas</Text>
          </View>
          <View style={estilo.form}>
            <Text style={estilo.textoInput}>Tarefa:</Text>
            <TextInput onChangeText={(valorDigitado) => { this.setState({ tarefa: valorDigitado }) }} placeholder="Informe a tarefa" keyboardType="default" style={estilo.inputs}></TextInput>
            <Text style={estilo.textoInput}>Detalhes:</Text>
            <TextInput onChangeText={(valorDigitado) => { this.setState({ detalhes: valorDigitado }) }} placeholder="Adicione algum detalhe" keyboardType="default" style={estilo.inputs}></TextInput>
            <Text style={estilo.textoInput}>Data:</Text>
            <TextInput onChangeText={(valorDigitado) => { this.setState({ data: valorDigitado }) }} placeholder="Informe a data" keyboardType="default" style={estilo.inputs}></TextInput>
            <View style={estilo.areabotaoSave}>
              <TouchableOpacity onPress={() => this.Cadastrar(this.state.tarefa, this.state.detalhes, this.state.data)} style={estilo.botaoSave}>
                <Text style={estilo.textSave}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={estilo.lista}>
            <Text style={estilo.textoLista}>Lista de Tarefas</Text>
            {
              this.state.lista.map(
                item => (
                  <TarefaComponent
                    key={item.id}
                    id={item.id}
                    tarefa={item.tarefa}
                    detalhes={item.detalhes}
                    data={item.data}
                    situacao={item.situacao}
                    atrasado={this.AtrasarSituacao}
                    adiantado={this.AdiantarSituacao}
                    deletar={this.DeletarTarefa}
                  />
                )
              )
            }
          </View>
        </View>
      </ScrollView>

    )
  }
}

const estilo = StyleSheet.create({

  background: {
    backgroundColor: '#f2f2f2'
  },

  titulo: {
    height: 60,
    backgroundColor: '#8febc6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  textoTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: 'black'
  },

  form: {
    margin: 20,
  },

  textoInput: {
    fontSize: 15,
    color: '#50856f',
  },

  inputs: {
    borderBottomWidth: 1,
    borderBottomColor: '#50856f',
    marginBottom: 5,
    fontSize: 12,
  },

  areabotaoSave: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textSave: {
    fontSize: 35,
    fontWeight: "bold",
    color: 'black',
  },

  botaoSave: {
    width: 50,
    height: 50,
    backgroundColor: '#8febc6',
    alignItems: 'center',
    alignContent: "center",
    textAlign: 'center',
    borderRadius: 25,
    margin: 10,
    elevation: 5
  },

  lista: {
    marginLeft: 20,
    marginRight: 20,
  },

  textoLista: {
    fontSize: 15,
    color: '#50856f',
  },
})