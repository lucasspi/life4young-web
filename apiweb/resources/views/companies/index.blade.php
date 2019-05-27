<!doctype html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

    <title>Document</title>
</head>
<body>
<div class="container">
    <div class="jumbotron">
        <h1>Fornecedores</h1>
    </div>
    <a href="companies/criar" class="btn btn-dark mb-2">Adicionar</a>
    <ul class="list-group">
            <?php foreach ($providers as $provider): ?>
                <li class="list-group-item"><?= $provider; ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
</body>
</html>
