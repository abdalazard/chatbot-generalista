<?php
if (isset($_POST['text'])) {
    $userInput = $_POST['text'];

    // Chave da API
    $apiKey = 'org-W6upTt2tHmMx8lDGQWbZSrHB'; // Substitua pela sua chave da API OpenAI

    // Configuração da requisição
    $url = 'https://api.openai.com/v1/chat/completions';
    $data = [
        'model' => 'gpt-3.5-turbo', // Ou o modelo que você estiver usando
        'messages' => [
            ['role' => 'user', 'content' => $userInput]
        ]
    ];

    // Configurações do cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey,
    ]);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

    // Executa a requisição
    $response = curl_exec($ch);
    curl_close($ch);

    // Processa a resposta
    $responseDecoded = json_decode($response, true);
    if (isset($responseDecoded['choices'][0]['message']['content'])) {
        echo $responseDecoded['choices'][0]['message']['content'];
    } else {
        echo "Erro ao obter resposta.";
    }
}
?>
