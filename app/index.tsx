import { useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0ffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    margin: 20,
    color: "#990000",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    margin: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});

export default function Index() {
  const [valorBem, setValorBem] = useState("");
  const [parcelas, setParcelas] = useState("");
  const [taxaJuros, setTaxaJuros] = useState("");
  const [taxasAdicionais, setTaxasAdicionais] = useState("");
  const [resultado, setResultado] = useState("");

  function calcularFinanciamento() {
    if (valorBem && parcelas && taxaJuros) {

      const C = parseFloat(valorBem);  
      const t = parseInt(parcelas); 
      const i = parseFloat(taxaJuros) / 100;
      const taxas = parseFloat(taxasAdicionais) || 0; 

      if (i === 0) {
        setResultado("A taxa de juros não pode ser zero.");
        return;
      }

      const M = C * Math.pow(1 + i, t) + taxas;

      const p = M / t;

      if (isNaN(p) || !isFinite(p)) {
        setResultado("Erro nos cálculos. Verifique os valores inseridos.");
        return;
      }

      setResultado(
        `Valor Total a Ser Pago: R$ ${M.toFixed(2)}\nValor da Parcela: R$ ${p.toFixed(2)}`
      );
    } else {
      setResultado("Por favor, insira todos os dados corretamente.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Simular Financiamento</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o valor do bem (R$)"
        keyboardType="numeric"
        value={valorBem}
        onChangeText={setValorBem}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite o número de parcelas"
        keyboardType="numeric"
        value={parcelas}
        onChangeText={setParcelas}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite a taxa de juros mensal (%)"
        keyboardType="numeric"
        value={taxaJuros}
        onChangeText={setTaxaJuros}
      />
      <TextInput
        style={styles.input}
        placeholder="Digite as taxas adicionais (R$)"
        keyboardType="numeric"
        value={taxasAdicionais}
        onChangeText={setTaxasAdicionais}
      />

      <Button
        title="Calcular Financiamento"
        color={"#990000"}
        onPress={calcularFinanciamento}
      />

      <Text style={styles.text}>{resultado}</Text>
    </View>
  );
}
