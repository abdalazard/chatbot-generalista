
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Assistente de Correção de Texto</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Assistente de Correção de Texto</h1>
        <textarea id="user-input" placeholder="Digite sua mensagem aqui..." rows="4" cols="50"></textarea>
        <button id="send-btn">Enviar</button>
        <p id="recording-status"></p>

        <div id="input-text" class="text-output"></div>
        <div id="corrected-text" class="text-output"></div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
