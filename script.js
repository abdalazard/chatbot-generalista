$(document).ready(function() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR'; // Define o idioma da fala
    recognition.interimResults = false;

    // Inicia a captura de fala
    $('#start-record-btn').click(function() {
        $('#recording-status').text('Fale agora...');
        recognition.start(); // Inicia o reconhecimento de voz
    });

    recognition.onresult = function(event) {
        let spokenText = event.results[0][0].transcript; // Captura o texto transcrito
        $('#input-text').html("<span class='original'>" + spokenText + "</span>");

        // Envia o texto falado para o PHP via AJAX para correção
        $.ajax({
            url: 'correct.php',
            method: 'POST',
            data: { text: spokenText },
            success: function(response) {
                let corrections = JSON.parse(response);
                let correctedText = "";

                // Itera sobre o texto corrigido e aplica estilos
                corrections.forEach(function(word) {
                    if (word.correct) {
                        correctedText += "<span class='corrected'>" + word.corrected + "</span> ";
                    } else {
                        correctedText += "<span class='incorrect'>" + word.original + "</span> ";
                    }
                });

                $('#corrected-text').html("<span class='gray'>" + correctedText + "</span>");
            },
            error: function(xhr, status, error) {
                console.error("Erro: " + error);
            }
        });
    };

    recognition.onerror = function(event) {
        $('#recording-status').text('Erro ao capturar a voz: ' + event.error);
    };

    recognition.onspeechend = function() {
        $('#recording-status').text('Fala finalizada.');
        recognition.stop();
    };
});
