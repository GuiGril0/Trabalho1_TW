//função para submeter o formulário
let response;

function submission(forms) {
    for(i of forms){
        console.log(i);
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if (this.readyState == XMLHttpRequest.DONE){
            alert(xhttp.responseText)
        }
    };
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/registaoferta", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send();
    return false
}