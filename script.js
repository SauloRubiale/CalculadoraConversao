// ============================
// SELEÇÃO DOS ELEMENTOS (DOM)
// ============================

// Inputs de entrada de valores
const euroinput = document.getElementById("euro");
const dolarinput = document.getElementById("dolar");

// Botões de conversão
const converterEuroInput = document.getElementById("botao-converter-euro");
const converterDolarInput = document.getElementById("botao-converter-dolar");

// Áreas onde os resultados serão exibidos
const resultadoEuroInput = document.getElementById("resultadoEuro");
const resultadoDolarInput = document.getElementById("resultadoDolar");

// Botão para limpar todos os campos
const botaoLimpar = document.getElementById("botao-limpar");

// Define o foco inicial no campo de Euro para melhorar a UX
euroinput.focus();

// ============================
// AÇÕES DE INTERFACE (UX)
// ============================

// Evento responsável por limpar inputs e resultados
botaoLimpar.addEventListener("click", () => {
  euroinput.value = ""; // Remove valor digitado no campo Euro
  dolarinput.value = ""; // Remove valor digitado no campo Dólar

  resultadoEuroInput.innerHTML = ""; // Limpa resultado do Euro
  resultadoDolarInput.innerHTML = ""; // Limpa resultado do Dólar

  euroinput.focus(); // Retorna foco para o primeiro campo
});

// Navegação via teclado: ENTER no campo Euro leva para o campo Dólar
euroinput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    dolarinput.focus();
  }
});

// Navegação via teclado: ENTER no campo Dólar executa ambas conversões
dolarinput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    converterEuroInput.click(); // Dispara conversão de Euro
    converterDolarInput.click(); // Dispara conversão de Dólar
  }
});

// ============================
// CONVERSÃO: EURO → REAL (BRL)
// ============================

converterEuroInput.addEventListener("click", async () => {
  // Requisição para API externa de cotação em tempo real
  const resposta = await fetch(
    "https://economia.awesomeapi.com.br/last/EUR-BRL",
  );

  // Conversão da resposta para JSON
  const dados = await resposta.json();

  // Taxa atual do Euro em relação ao Real
  let euro = dados.EURBRL.bid;

  // Validação: garante que há valor e que ele é positivo
  if (euroinput.value !== "" && euroinput.value > 0) {
    const valor = parseFloat(euroinput.value);

    // Cálculo da conversão
    const resultado = valor * euro;

    // Exibição do resultado formatado com 2 casas decimais
    resultadoEuroInput.innerHTML = `
      <span class="text-primary">
        Conversão de Euro para Real: R$ ${resultado.toFixed(2)}
      </span>
      <br>
      <span style="font-size: 12px; color: #6c757d; white-space: nowrap; margin-left: 5px;">
        (Cotação: R$ ${euro} | Atualizado em ${dados.EURBRL.create_date})
      </span>
    `;
  } else {
    // Feedback de erro para o usuário
    resultadoEuroInput.innerHTML =
      '<span class="text-danger">Digite um valor de Euro válido!</span>';
  }
});

// ============================
// CONVERSÃO: DÓLAR → REAL (BRL)
// ============================

converterDolarInput.addEventListener("click", async () => {
  // Requisição da cotação do Dólar
  const resposta = await fetch(
    "https://economia.awesomeapi.com.br/last/USD-BRL",
  );

  // Conversão da resposta para JSON
  const dados = await resposta.json();

  // Taxa atual do Dólar em relação ao Real
  let dolar = dados.USDBRL.bid;

  // Validação do input
  if (dolarinput.value !== "" && dolarinput.value > 0) {
    const valor = parseFloat(dolarinput.value);

    // Cálculo da conversão
    const resultado = valor * dolar;

    // Exibição do resultado
    resultadoDolarInput.innerHTML = `
      <span class="text-success">
        Conversão de Dólar para Real: R$ ${resultado.toFixed(2)}
      </span>
      <br>
      <span style="font-size: 12px; color: #6c757d; white-space: nowrap; margin-left: 5px;">
        (Cotação: R$ ${dolar} | Atualizado em ${dados.USDBRL.create_date})
      </span>
    `;
  } else {
    // Mensagem de erro
    resultadoDolarInput.innerHTML =
      '<span class="text-danger">Digite um valor de Dólar válido!</span>';
  }
});
