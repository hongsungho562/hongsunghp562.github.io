<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>게임 로비</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #F0F4F8;
            text-align: center;
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #333;
            margin-bottom: 40px;
        }
        .game-card {
            display: inline-block;
            width: 200px;
            height: 250px;
            margin: 15px;
            border: 2px solid #007BFF;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            background-color: white;
            transition: transform 0.2s;
        }
        .game-card:hover {
            transform: scale(1.05);
        }
        .game-title {
            font-size: 1.5em;
            color: #007BFF;
            margin: 15px 0;
        }
        .start-button {
            padding: 10px 20px;
            font-size: 1.2em;
            color: white;
            background-color: #FF5722;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .start-button:hover {
            background-color: #E64A19;
        }
    </style>
</head>
<body>
    <h1>게임 로비</h1>
    <div class="game-card">
        <div class="game-title">캐릭터 이름 맞추기 대회</div>
        <button class="start-button" onclick="startGame('ex')">게임 시작</button>
    </div>

    <script>
       function startGame(game) {
            // 각 게임 페이지로 이동
            window.location.href = game + '.html';
        }
    </script>
</body>
</html>
