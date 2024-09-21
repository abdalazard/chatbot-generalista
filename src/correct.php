<?php
if (isset($_POST['text'])) {
    $text = $_POST['text'];

    // Faz uma requisição à API do LanguageTool
    $url = 'https://api.languagetool.org/v2/check';
    $data = [
        'text' => $text,
        'language' => 'pt-BR'
    ];

    $options = [
        'http' => [
            'header' => 'Content-type: application/x-www-form-urlencoded',
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];

    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    // Processa a resposta da API
    $responseDecoded = json_decode($result, true);
    $matches = $responseDecoded['matches'];

    // Cria uma lista de correções
    $corrections = [];
    foreach ($matches as $match) {
        $original = substr($text, $match['offset'], $match['length']);
        $correction = isset($match['replacements'][0]['value']) ? $match['replacements'][0]['value'] : $original;

        $corrections[] = [
            'original' => $original,
            'corrected' => $correction,
            'correct' => $correction !== $original
        ];
    }

    // Retorna o texto corrigido como JSON
    echo json_encode($corrections);
}
?>
