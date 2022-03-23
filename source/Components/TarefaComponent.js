import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

export default class TarefaComponent extends Component {

    getEstilo() {
        if(this.props.situacao == 'Adiantado') {
          return { color:'#8febc6', fontWeight: 'bold' }
        } else if (this.props.situacao == 'Atrasado') {
          return { color:'#ed594e', fontWeight: 'bold' } 
        } else {
          return { color:'black' } 
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={estilo.areaLista}>
                    <View style={{marginBottom: 10}}>
                        <Text style={estilo.textoTarefa}>{this.props.tarefa}</Text>
                        <Text style={estilo.textoDetalhes}>{this.props.detalhes}</Text>
                        <Text style={estilo.textoData}>{this.props.data}</Text>
                        <Text><Text style={this.getEstilo()}>{this.props.situacao}</Text></Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: 'flex-end'}}>
                        <TouchableOpacity onPress={ () => {this.props.adiantado(this.props.id) } } style={estilo.botaoAdiantar}><Text style={estilo.textoAdiantar}>↑</Text></TouchableOpacity>
                        <TouchableOpacity onPress={ () => {this.props.atrasado(this.props.id) } } style={estilo.botaoAtrasar}><Text style={estilo.textoAtrasar}>↓</Text></TouchableOpacity>
                        <TouchableOpacity onPress={ () => {this.props.deletar(this.props.id) } } style={estilo.botaoExcluir}><Text style={estilo.textoExcluir}>x</Text></TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    };
};

const estilo = StyleSheet.create({

    areaLista: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    textoAdiantar: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'black',
    },

    botaoAdiantar: {
        width: 30,
        height: 30,
        backgroundColor: '#8febc6',
        alignItems: 'center',
        alignContent: "center",
        textAlign: 'center',
        borderRadius: 15,
        margin: 5,
        elevation: 5
    },

    textoAtrasar: {
        fontSize: 22,
        fontWeight: "bold",
        color: 'black',
    },

    botaoAtrasar: {
        width: 30,
        height: 30,
        backgroundColor: '#ed594e',
        alignItems: 'center',
        alignContent: "center",
        textAlign: 'center',
        borderRadius: 15,
        margin: 5,
        elevation: 5
    },

    textoExcluir: {
        fontSize: 20,
        fontWeight: "bold",
        color: 'black',
    },

    botaoExcluir: {
        width: 30,
        height: 30,
        backgroundColor: '#7d7d7d',
        alignItems: 'center',
        alignContent: "center",
        textAlign: 'center',
        borderRadius: 15,
        margin: 5,
        elevation: 5
    },

    textoTarefa: {
        fontSize: 15,
        fontWeight: "bold",
        color: 'black',
    },

    textoDetalhes: {
        fontSize: 13,
        fontWeight: "normal",
        color: 'black',
    },

    textoData: {
        fontSize: 13,
        fontWeight: "normal",
        color: 'black',
    },
})