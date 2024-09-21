$(document).ready(function() {
    let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'pt-BR';
    recognition.interimResults = false;

    $('#start-record-btn').click(function() {
        $('#recording-status').text('Fale agora...');
        recognition.start();
    });

    recognition.onresult = function(event) {
        let spokenText = event.results[0][0].transcript;
        $('#input-text').html("<span class='original'>" + spokenText + "</span>");

        // Envia o texto falado para o PHP via AJAX para o ChatGPT
        $.ajax({
            url: 'chat.php', // Altere para o novo arquivo PHP
            method: 'POST',
            data: { text: spokenText },
            success: function(response) {
                $('#corrected-text').html("<span class='gray'>" + response + "</span>");
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
