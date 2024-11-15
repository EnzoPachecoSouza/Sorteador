document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('sorteio-form');
    const gerarInputsBtn = document.getElementById('gerar-inputs');
    const sortearBtn = document.getElementById('sortear');
    const novoSorteioBtn = document.getElementById('novo-sorteio');
    const bandasContainer = document.getElementById('bandas-container');
    const resultado = document.getElementById('resultado');
    const tabelaResultado = document.querySelector('#tabela-resultado tbody');
  
    gerarInputsBtn.addEventListener('click', () => {
      const quantidade = parseInt(document.getElementById('quantidade').value);
      bandasContainer.innerHTML = '';
  
      if (!isNaN(quantidade) && quantidade > 1) {
        for (let i = 1; i <= quantidade; i++) {
          const input = document.createElement('input');
          input.type = 'text';
          input.placeholder = `Nome da Banda ${i}`;
          input.required = true;
          input.classList.add('banda-input');
          bandasContainer.appendChild(input);
        }
        sortearBtn.disabled = false;
      } else {
        alert('Por favor, insira um número válido de bandas (mínimo 2).');
      }
    });
  
    sortearBtn.addEventListener('click', () => {
      const inputs = document.querySelectorAll('.banda-input');
      const bandas = Array.from(inputs).map(input => input.value).filter(value => value.trim() !== '');
      const categoria = document.getElementById('categoria').value.trim();
  
      if (bandas.length === inputs.length && categoria) {
        const shuffledBandas = bandas.sort(() => Math.random() - 0.5);
        tabelaResultado.innerHTML = '';
        shuffledBandas.forEach((banda, index) => {
          const row = tabelaResultado.insertRow();
          row.insertCell(0).textContent = index + 1;
          row.insertCell(1).textContent = banda;
        });
        form.style.display = 'none';
        resultado.style.display = 'block';
      } else {
        alert('Preencha todos os campos antes de sortear.');
      }
    });
  
    novoSorteioBtn.addEventListener('click', () => {
      form.reset();
      bandasContainer.innerHTML = '';
      sortearBtn.disabled = true;
      form.style.display = 'block';
      resultado.style.display = 'none';
    });
  });
  
  