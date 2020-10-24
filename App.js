import React, { Component, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,

}

export default class App extends Component {
  state = { ...initialState } //Foi criado um clone(outro objeto com os mesmos valores) do objeto inicialState no state

  addDigit = n => {
    //console.debug(typeof this.state.displayValue)



    const clearDisplay = this.state.displayValue === '0' //Validação para não permitir add o 0 mais de uma vez no início do display
      || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.')) { //O ponto não pode ser add mais de uma vez
      return
    }

    const currentValue = clearDisplay ? '' : this.state.displayValue

    const displayValue = currentValue + n

    this.setState({ displayValue, clearDisplay: false })

    if (n !== '.') {
      const newValue = parseFloat(displayValue)
      const values = [...this.state.values]
      values[this.state.current] = newValue
      this.setState({ values })
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({ operation, current: 1, clearDisplay: true })
    } else {
      const equals = operation === '='
      const values = [...this.state.values]
      try {
        values[0] = eval(`${values[0]} ${this.state.operation} ${values[1]} `) //O eval pega o valor da string e transforma em operação exemplo na string '1 + 1' o eval retorna 2
      } catch (e) {
        values[0] = this.state.values[0]
      }

      values[1] = 0
      this.setState({
        displayValue: `${values[0]}`,
        operation: equals ? null : operation,
        current: equals ? 0 : 1,
        //clearDisplay: !equals,
        clearDisplay: true,
        values, //Quando temos duas propriedades com o mesmo nome, não precisamos setar 'values: values' o que seria este caso. Isso é uma nova implementação do novo Ecmascript

      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <Display value={state.displayValue} /> */}
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={this.setOperation} />
          <Button label='7' onClick={this.addDigit} />
          <Button label='8' onClick={this.addDigit} />
          <Button label='9' onClick={this.addDigit} />
          <Button label='*' operation onClick={this.setOperation} />
          <Button label='4' onClick={this.addDigit} />
          <Button label='5' onClick={this.addDigit} />
          <Button label='6' onClick={this.addDigit} />
          <Button label='-' operation onClick={this.setOperation} />
          <Button label='1' onClick={this.addDigit} />
          <Button label='2' onClick={this.addDigit} />
          <Button label='3' onClick={this.addDigit} />
          <Button label='+' operation onClick={this.setOperation} />
          <Button label='0' double onClick={this.addDigit} />
          <Button label='.' onClick={this.addDigit} />
          <Button label='=' operation onClick={this.setOperation} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap' //Permite a quebra de linha na row

  }
});
