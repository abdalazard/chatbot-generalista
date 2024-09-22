$(document).ready(function() {
    // Carregar o arquivo MD antes da requisição AJAX
    fetch('treinamento.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo treinamento.md: ' + response.statusText);
            }
            return response.text(); 
        })
        .then(texto => {
            // Extrair a frase entre aspas do arquivo MD
            let instrucao = texto.match(/"([^"]+)"/); 
            if (instrucao && instrucao.length > 1) {
                instrucao = instrucao[1]; // Pegar o conteúdo entre aspas
            } else {
                instrucao = "sem dados encontrados!"; // Valor padrão caso não encontre a instrução no arquivo
            }

            $('#send-btn').click(function() {
                let userInput = $('#user-input').val().trim();

                if (userInput) {
                    // Mostrar o indicador de carregamento
                    $('#loading-indicator').show(); 

                    $.ajax({
                        url: 'http://localhost:11434/api/chat',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            model: "llama3",
                            messages: [
                                { "role": "user", "content": instrucao + "\n" + "Texto do usuário: " +userInput } // Usar a instrução extraída do MD + input do usuário
                            ],
                            stream: false
                        }),
                        success: function(response) {
                            console.log(response);
                            let correcao = response.message.content; 

                            // Ocultar o indicador de carregamento
                            $('#loading-indicator').hide(); 

                            $('#corrected-text').text(correcao); 
                        },
                        error: function(xhr, status, error) {
                            console.error("Erro na requisição AJAX:", error);

                            // Ocultar o indicador de carregamento em caso de erro
                            $('#loading-indicator').hide();

                            $('#corrected-text').css('color', 'red');
                            $('#corrected-text').text("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde."); 
                        }
                    });
                } else {
                    alert("Por favor, digite uma mensagem.");
                }
            });
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo treinamento.md:", error);
            alert("Erro ao carregar o arquivo de treinamento. Por favor, verifique o caminho e tente novamente.");
        });
});


// $(document).ready(function() {
//     // ... (seu código para carregar o arquivo treinamento.md)

//     // Configurar o reconhecimento de voz
//     const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
//     recognition.lang = 'pt-BR'; // Definir o idioma para português do Brasil

//     let isRecording = false; // Variável para controlar o estado da gravação

//     $('#record-btn').click(function() { // Assumindo que você tem um botão com o ID 'record-btn'
//         if (!isRecording) {
//             recognition.start();
//             isRecording = true;
//             $('#record-btn').text('Parar Gravação');
//         } else {
//             recognition.stop();
//             isRecording = false;
//             $('#record-btn').text('Iniciar Gravação');
//         }
//     });

//     recognition.onresult = function(event) {
//         let userInput = event.results[0][0].transcript;
//         $('#user-input').val(userInput); // Exibir o texto transcrito (opcional)

//         // Enviar a requisição AJAX para a API (similar ao seu código anterior)
//         // ...

//         // Lidar com a resposta da API
//         success: function(response) {
//             console.log(response);
//             let respostaIA = response.message.content; 

//             // Configurar a síntese de voz
//             const synth = window.speechSynthesis;
//             const utterance = new SpeechSynthesisUtterance(respostaIA);
//             utterance.lang = 'pt-BR';

//             // Reproduzir a resposta em áudio
//             synth.speak(utterance);

//             // Ocultar o indicador de carregamento
//             $('#loading-indicator').hide(); 

//             $('#corrected-text').text(respostaIA); // Exibir o texto da resposta (opcional)
//         },
//         // ... (tratamento de erros)
//     };
// });