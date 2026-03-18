const euroinput = document.getElementById("euro");

const dolarinput = document.getElementById("dolar");

const converterInput = document.getElementById("botao-converter");

const resultadoInput = document.getElementById("resultado");

const euro = 6;

const dolar = 5.2;

converterInput.addEventListener("click", () => {
  if (euroinput.value !== "" && euroinput.value > 0) {
    const valor = euroinput.value;

    const resultado = valor * euro;

    resultadoInput.innerHTML = `<span class="text-success">Resultado: R$ ${resultado.toFixed(2)}</span>`;
  } else if (dolarinput.value !== "" && dolarinput.value > 0) {
    const valor = dolarinput.value;

    const resultado = valor * dolar;

    resultadoInput.innerHTML = `<span class="text-success">Resultado: R$ ${resultado.toFixed(2)}</span>`;
  } else {
    resultadoInput.innerHTML =
      '<span class="text-danger">Digite um valor válido!</span>';
  }
});
