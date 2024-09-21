<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assistente de Correção de Voz</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Assistente de Correção de Voz</h1>
        <button id="start-record-btn">Falar</button>
        <p id="recording-status"></p>

        <div id="input-text" class="text-output">
            <!-- O texto falado aparecerá aqui -->
        </div>

        <div id="corrected-text" class="text-output">
            <!-- O texto corrigido aparecerá aqui -->
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
