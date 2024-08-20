// estilos/script.js

document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btnAdd .add');
    const vlrTotal = document.getElementById('vlrTotal');
    const itens = document.getElementById('itens');
    const finalizarCompraButton = document.getElementById('finalizarCompra');
    let total = 0;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const nome = button.getAttribute('data-nome');
            const preco = parseFloat(button.getAttribute('data-preco'));
            const imagem = button.getAttribute('data-imagem');

            total += preco;
            vlrTotal.textContent = `R$ ${total.toFixed(2)}`;

            // Cria um item da sacola
            const item = document.createElement('div');
            item.classList.add('item');
            item.innerHTML = `
                <div class="imgSacola">
                    <img src="${imagem}" alt="${nome}">
                </div>
                <div class="descSacola">${nome}</div>
                <div class="quantidade">1</div>
                <div class="vlrSacola">R$ ${preco.toFixed(2)}</div>
                <div class="totItem vlrSacola">R$ ${preco.toFixed(2)}</div>
                <div class="btnRemover">
                    <img src="imagens/remover.png" alt="Remover Item" style="width: 20px; height: 20px;">
                </div>
            `;
            itens.appendChild(item);

            // Adiciona funcionalidade de remover item
            const removeButton = item.querySelector('.btnRemover img');
            removeButton.addEventListener('click', () => {
                itens.removeChild(item);
                total -= preco;
                vlrTotal.textContent = `R$ ${total.toFixed(2)}`;
            });
        });
    });

    // Função para impressão
    finalizarCompraButton.addEventListener('click', () => {
        const printWindow = window.open('', '', 'height=600,width=800');
        printWindow.document.write('<html><head><title>Resumo da Compra</title>');
        printWindow.document.write('<style>body { font-family: Arial, sans-serif; margin: 20px; }');
        printWindow.document.write('#itens { margin-bottom: 20px; }');
        printWindow.document.write('.item { border-bottom: 1px solid #ddd; padding: 10px 0; display: flex; align-items: center; }');
        printWindow.document.write('.imgSacola img { width: 50px; height: auto; margin-right: 10px; }');
        printWindow.document.write('.descSacola { font-weight: bold; }');
        printWindow.document.write('.vlrSacola, .totItem { text-align: right; }</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<h1>Resumo da Compra</h1>');
        printWindow.document.write('<div id="itens">' + itens.innerHTML + '</div>');
        printWindow.document.write('<div id="total">Total: ' + vlrTotal.innerHTML + '</div>');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    });
});
