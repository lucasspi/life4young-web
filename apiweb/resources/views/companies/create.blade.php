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
        <h1>Adicionar Fornecedores</h1>
    </div>
    <form method="post">
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputEmail4">Nome</label>
                <input type="text" class="form-control" id="nameInput" placeholder="Nome">
            </div>
            <div class="form-group col-md-6">
                <label for="inputPassword4">Email</label>
                <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="inputAddress">Telefone</label>
                <input type="text" class="form-control item" id="phone-number" placeholder="+55 11 12345678">
            </div>
            <div class="form-group col-md-6">
                <label for="inputAddress">Endereço</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="Av. Vasconcelos Costa, 1299">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group col-md-4">
                <label for="inputState">State</label>
                <select id="inputState" class="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                </select>
            </div>
            <div class="form-group col-md-4">
                <label for="inputCity">Cidade</label>
                <input type="text" class="form-control" id="inputCity">
            </div>
            <div class="form-group col-md-4">
                <label for="exampleFormControlFile1">Foto do fornecedor</label>
                <input type="file" class="form-control-file" id="exampleFormControlFile1">
            </div>
        </div>
        <fieldset class="form-group">
            <div class="row">
                <legend class="col-form-label col-sm-2 pt-0">Tipo de fornecedor</legend>
                <div class="col-sm-10">
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked>
                        <label class="form-check-label" for="gridRadios1">
                            Entretenimento
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2">
                        <label class="form-check-label" for="gridRadios2">
                            Alimentação
                        </label>
                    </div>
                </div>
            </div>
        </fieldset>
        <button  class="btn btn-primary">Adicionar</button>
    </form>
</div>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.min.js"></script>
<script src="../../js/index.js"></script>
</body>

</html>
