
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gerador de ideias para App por Ia</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <div style="display: flex; flex-direction: column; gap: 30px;">
        <div class="container">
            <h1>Gerador de ideias para App por Ia</h1>

            <p id="loading-indicator"></p><p id="loading-indicator-text">Carregando...</p>

            <!-- <div id="input-text" class="text-output"></div> -->
            <div id="corrected-text" class="text-output"></div>
            <button id="send-btn">Peça 5 ideias de App</button>

        </div>

        <div class="container" style="position: fixed; bottom: 0;  margin-bottom: 10px; background-color: #f8f9fa; text-align: center; text-align: center;">
        <h2 id="about-the-author">About the author</h2>
            <div style="display: flex; align-items: center;">
                <img src="author.jpg" alt="Vinicius Abdala" style="border-radius: 50%; width: 100px; height: 100px; margin-right: 20px;">
                <p style="text-align: center; font-size: 14px;"><strong>Vinícius "Abdalazard" Abdala</strong> is a software
                    developer passionate about technology. He has experience in
                    several programming languages, including PHP, JavaScript, and SQL. Also
                    he worked and works in big projects, using technologies like
                    React.js, React Native and jQuery. He believes in the power of
                    open source and loves contributing to open source projects in his
                    free time and giving workshops. You can follow him on GitHub at
                    <a href="https://github.com/abdalazard" style="text-decoration: none; color: blue;">github.com/abdalazard</a> or in
                    his <a href="https://abdalazard.online" style="text-decoration: none; color: blue;">website</a>.
                </p>
            </div>
        </div>
    </div>

    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="script.js"></script>
</body>
</html>
