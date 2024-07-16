document.addEventListener('DOMContentLoaded', function () {
    initializeForm();

    function initializeForm() {
        // Preencher a data com a data atual
        const today = new Date().toISOString().substr(0, 10);
        document.getElementById('data').value = today;
    }

    function calculateRSI() {
        const data = {
            nome: document.getElementById('nome').value,
            data: document.getElementById('data').value,
            rouquidao: parseInt(document.getElementById('rouquidao').value) || 0,
            limpezaGarganta: parseInt(document.getElementById('limpezaGarganta').value) || 0,
            noduloGarganta: parseInt(document.getElementById('noduloGarganta').value) || 0,
            tosseAposComer: parseInt(document.getElementById('tosseAposComer').value) || 0,
            dificuldadeEngolir: parseInt(document.getElementById('dificuldadeEngolir').value) || 0,
            tosseSemResfriado: parseInt(document.getElementById('tosseSemResfriado').value) || 0,
            mucoGarganta: parseInt(document.getElementById('mucoGarganta').value) || 0,
            dificuldadeRespirar: parseInt(document.getElementById('dificuldadeRespirar').value) || 0,
            pigarro: parseInt(document.getElementById('pigarro').value) || 0
        };

        const totalScore = Object.values(data).slice(2).reduce((a, b) => a + b, 0);
        const resultDiv = document.getElementById('result');
        const classificationMessageElement = document.getElementById('classificationMessage');

        document.getElementById('totalScore').innerText = totalScore;

        let classificationMessage = '';
        resultDiv.classList.remove('green', 'yellow', 'red');
        if (totalScore <= 13) {
            classificationMessage = 'Seu escore está dentro do limite normal. Provavelmente você não tem refluxo faringolaríngeo significativo.';
            resultDiv.classList.add('green');
        } else if (totalScore <= 21) {
            classificationMessage = 'Seu escore sugere que você pode ter refluxo faringolaríngeo leve. É aconselhável consultar um especialista.';
            resultDiv.classList.add('yellow');
        } else {
            classificationMessage = 'Seu escore sugere que você pode ter refluxo faringolaríngeo moderado a grave. Consulte um especialista para avaliação detalhada.';
            resultDiv.classList.add('red');
        }

        classificationMessageElement.innerText = classificationMessage;
    }

    function printReport() {
        calculateRSI();
        
        const nome = document.getElementById('nome').value;
        const data = document.getElementById('data').value;
        const totalScore = document.getElementById('totalScore').innerText;
        const classificationMessage = document.getElementById('classificationMessage').innerText;

        const reportWindow = window.open('', '_blank');
        reportWindow.document.write(`
            <html>
            <head>
                <title>Relatório RSI</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1 { color: #20c997; }
                    .result { margin-top: 20px; }
                    .result p { margin: 5px 0; }
                    .green { color: #155724; }
                    .yellow { color: #856404; }
                    .red { color: #721c24; }
                </style>
            </head>
            <body>
                <h1>Relatório RSI</h1>
                <p><strong>Nome do Paciente:</strong> ${nome}</p>
                <p><strong>Data:</strong> ${data}</p>
                <div class="result">
                    <p><strong>Resultado:</strong> ${totalScore}</p>
                    <p class="${totalScore <= 13 ? 'green' : totalScore <= 21 ? 'yellow' : 'red'}">${classificationMessage}</p>
                </div>
                <button onclick="window.print()">Imprimir</button>
            </body>
            </html>
        `);
        reportWindow.document.close();
    }

    document.querySelector('button[type="button"]').addEventListener('click', calculateRSI);
    document.querySelector('button[onclick="printReport()"]').addEventListener('click', printReport);
});
