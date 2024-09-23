$(document).ready(function() {
    let treinamento = null; // Variável para armazenar o conteúdo do arquivo
    $('#loading-indicator').hide(); 
    $('#loading-indicator-text').hide(); 

    fetch('treinamento.md')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar o arquivo treinamento.md: ' + response.statusText);
            }
            return response.text();
        })
        .then(texto => {
            treinamento = texto; 

            // Anexar o manipulador de eventos click apenas uma vez, após o arquivo ser carregado
            $('#send-btn').click(function() {
                if (treinamento) {
                    $('#loading-indicator').show(); 
                    $('#loading-indicator-text').show(); 

                    chamaIa(treinamento)
                        .then(() => {
                            $('#loading-indicator').hide(); 
                            $('#loading-indicator-text').hide(); 

                        })
                        .catch(error => {
                            console.error("Erro na requisição AJAX:", error);
                            $('#loading-indicator').hide();
                            $('#corrected-text').css('color', 'red');
                            $('#corrected-text').text("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde."); 
                        });
                }
            }); 
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo treinamento.md:", error);
            alert("Erro ao carregar o arquivo de treinamento. Por favor, verifique o caminho e tente novamente.");
        });
    
    });
    
async function chamaIa(treinamento) {
    try {
        const response = await $.ajax({
            url: 'http://localhost:11434/api/chat',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                model: "llama3",
                messages: [
                    { "role": "user", "content": treinamento } // Usar a instrução extraída do MD
                ],
                stream: false
            })
        });

        console.log(response); 

        let resposta = response.message.content; 

        try {
            let ideias = JSON.parse(resposta); // Alterado para 'ideias' para refletir a estrutura da resposta

        let listaIdeias = "<ul>"; // Alterado para 'listaIdeias'
        ideias.forEach(item => {
            listaIdeias += `<li class='text-start ' style='margin-bottom: 5px;'>${item.nome} - ${item.descricao}</li>`; // Usando 'nome' e 'descrição'
        });
        listaIdeias += "</ul>";

        $('#corrected-text').html(listaIdeias);

        } catch (error) {
            console.error("Erro ao analisar o JSON:", error);
            // Lidar com o erro de forma adequada (exibir mensagem ao usuário, etc.)
        }
    } catch (error) {
        // Lidar com o erro da requisição AJAX aqui, se necessário
        throw error; // Lançar o erro para que o .catch() externo possa lidar com ele
    }
}
