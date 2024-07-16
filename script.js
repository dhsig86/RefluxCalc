document.addEventListener('DOMContentLoaded', function () {
    function calculateRSI() {
        const data = {
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

        const totalScore = Object.values(data).reduce((a, b) => a + b, 0);
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

    document.querySelector('button').addEventListener('click', calculateRSI);
});
