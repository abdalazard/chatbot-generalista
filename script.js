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

            $('#send-btn').click(function() {

                if (texto) {
                    // Mostrar o indicador de carregamento
                    $('#loading-indicator').show(); 

                    $.ajax({
                        url: 'http://localhost:11434/api/chat',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            model: "llama3",
                            messages: [
                                { "role": "user", "content": texto } // Usar a instrução extraída do MD + input do usuário
                            ],
                            stream: false
                        }),
                        success: function(response) {
                            console.log(response); 
                        
                            let correcao = response.message.content; 
                        
                            // Processar o JSON da resposta (assumindo que 'correcao' contém o JSON)
                            try {
                                let assuntos = JSON.parse(correcao);
                        
                                // Criar uma lista HTML dos assuntos
                                let listaAssuntos = "<ul>";
                                assuntos.forEach(item => {
                                    listaAssuntos += `<li class='text-start'>${item.assunto}</li>`;
                                });
                                listaAssuntos += "</ul>";
                        
                                // Exibir a lista no elemento 'corrected-text'
                                $('#corrected-text').html(listaAssuntos); 
                        
                            } catch (error) {
                                console.error("Erro ao analisar o JSON:", error);
                                // Lidar com o erro de forma adequada (exibir mensagem ao usuário, etc.)
                            }
                        
                            $('#loading-indicator').hide(); 
                        },
                        error: function(xhr, status, error) {
                            console.error("Erro na requisição AJAX:", error);

                            // Ocultar o indicador de carregamento em caso de erro
                            $('#loading-indicator').hide();

                            $('#corrected-text').css('color', 'red');
                            $('#corrected-text').text("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde."); 
                        }
                    });
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