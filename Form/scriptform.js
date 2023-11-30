document.addEventListener('DOMContentLoaded', function(){
    //Criação da lista de comentários
    var novaUl = document.createElement('ul');
    novaUl.id = 'commentList';
    document.querySelector('.conteudo').appendChild(novaUl);

    var commentList = [];

    var count = 1;

    //Adicionando comentários informações do formulário
    function addComment(data, nome, idade, ideia){
        var id;
        
        if(commentList.length > 0){
            id = commentList[commentList.length - 1].id + 1;
        }else{
            id = 1;
        };

        var newComment = {
            id: id,
            data: data, 
            nome: nome, 
            idade: idade, 
            ideia: ideia
        };

        commentList.push(newComment);

        localStorage.setItem('commentList', JSON.stringify(commentList));

        renderCommentsList();
    }

    //Deletar comentários
    function deleteComment(commentId){
        var updatedCommentList = commentList.filter(function (comment) {
            return comment.id !== commentId; 
        });

        if(updatedCommentList.length < commentList.length){
            commentList = updatedCommentList;
            localStorage.setItem('commentList', JSON.stringify(commentList));
            renderCommentsList();
        } else{
            alert('Comentário não encontrado.');
        }
    }
    
    //Recupera a lista de comentários armazenada no localStorage
    function getCommentList(){
        var storedList = JSON.parse(localStorage.getItem('commentList'));

        commentList = storedList || [];
    }

    //Renderiza a lista de comentários, cada um com sua data, nome, idade e ideia
    function renderCommentsList(){
        var commentListElement = document.getElementById('commentList');

        commentListElement.innerHTML = '';

        commentList.forEach(function (comment){
            var listItem = document.createElement('li');
            listItem.classList.add('comment-lista');
            listItem.innerHTML = 
                '<div class = "comment-item"> <h3 class = "comment-data">'+
                comment.data +
                '</h3> <h2 class = "comment-name">'+ 
                comment.nome + 
                '</h2> <p class =" comment-idade">'+ 
                comment.idade + 
                ' anos' + '</p> <p class = "comment-ideia">' + 
                comment.ideia + 
                '</p></div>';

            var deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Excluir comentário';
            
            deleteButton.dataset.commentId = comment.id;

            deleteButton.addEventListener('click', function() {
            deleteComment(comment.id);
            });

            listItem.appendChild(deleteButton);
            commentListElement.appendChild(listItem);
        })
    }

    getCommentList();

    renderCommentsList();

    //Atribuição dos valores a serem adicionados nos comentários
    document.getElementById('formulario').addEventListener(
        'submit', function(event){
            event.preventDefault();
            
            const dataAtual = new Date();
            const dia = dataAtual.getDate();
            const mes = dataAtual.getMonth();
            const ano = dataAtual.getFullYear();
            var data = dia + '/' + (mes + 1) + '/'+ ano;

            var nomeInput = document.getElementById('username');
            var idadeInput = document.getElementById('idade');
            var ideiaInput = document.getElementById('opinião');
            addComment(data, nomeInput.value, idadeInput.value, ideiaInput.value);
            
        }
    )
    
    //Limpar campos do formulário
    function limpar(){
        var nomeInput = document.getElementById('username');
        var idadeInput = document.getElementById('idade');
        var teleforneInput = document.getElementById('telefone');
        var emailInput = document.getElementById('e-mail');
        var interesseInput = document.getElementById('interesse');
        var ideiaInput = document.getElementById('opinião');

        nomeInput.value = "";
        idadeInput.value = "";
        teleforneInput.value = "";
        emailInput.value = "";
        interesseInput.value = ""
        ideiaInput.value = "";
    }

    var limparForm = document.createElement('button');
    limparForm.textContent = 'Limpar Formulário';
    limparForm.className = 'delete-button';
    limparForm.addEventListener('click', limpar);

    var form = document.getElementById('formulario');

    form.appendChild(limparForm);

    //Deletar todos os comentários
    function deleteAllComment(){

        commentList = [];

        localStorage.removeItem('commentList');

        renderCommentsList();
    }

    var deleteAllComments = document.createElement('button');
    deleteAllComments.textContent = 'Excluir Todos os Comentários';
    deleteAllComments.className = 'delete-button';
    deleteAllComments.addEventListener('click', deleteAllComment);

    var conteudo = document.querySelector('.conteudo');
    conteudo.appendChild(deleteAllComments);

    //Criação dos campos de busca por nome
    var searchLabel = document.createElement('label');
    searchLabel.textContent = 'Procurar comentário por nome:';
    searchLabel.className = 'label';

    var searchInput = document.createElement('input');
    searchInput.className = 'input';

    var searchArea = document.createElement('div');
    searchArea.className = 'search';

    var searchButton = document.createElement('button');
    searchButton.className = 'search-button';
    searchButton.textContent = 'Pesquisar';
    searchButton.addEventListener('click', searchNome);

    searchArea.appendChild(searchLabel);
    searchArea.appendChild(searchInput);
    searchArea.appendChild(searchButton);

    conteudo.insertBefore(searchArea, deleteAllComments);

    //Procura de comentário por nome
    function searchNome() {
        var nameSearched = searchInput.value.toLowerCase();
    
        if (nameSearched === '') {
            alert('Por favor, insira um nome para procurar.');
            return;
        }
    
        var namesFound = commentList.filter(function (comment) {
            return comment.nome.toLowerCase().includes(nameSearched);
        });
    
        if (namesFound.length > 0) {
            alert('Comentários encontrados:');
            renderCommentsFounded(namesFound); // Render the search results
            var listFounded = document.getElementsByClassName('comment-searched-lista');
            
            for(var i = 0;i < listFounded.length; i++){
                conteudo.insertBefore(listFounded[i], deleteAllComments);
            }
            
        } else {
            alert('Nenhum comentário com esse nome encontrado.');
        }
    }
    
    //Renderiza a lista de comentários encontrados na pesquisa
    function renderCommentsFounded(comments) {
        var commentListElement = document.getElementById('commentList');
    
        comments.forEach(function (comment) {
            var listItem = document.createElement('li');
            listItem.classList.add('comment-searched-lista');
            listItem.innerHTML =
                '<h3 class = "comment-founded">Comentário Encontrado:</h3>'+
                '<div class="comment-item">' +
                '<h3 class="comment-data">' +
                comment.data +
                '</h3> <h2 class="comment-name">' +
                comment.nome +
                '</h2> <p class=" comment-idade">' +
                comment.idade +
                ' anos' +
                '</p> <p class="comment-ideia">' +
                comment.ideia +
                '</p></div>';

            commentListElement.appendChild(listItem);
        });
    }
});    