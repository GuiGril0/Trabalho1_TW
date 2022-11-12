//função para submeter o formulário

function submission(forms) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function (){
        if(this.readyState == XMLHttpRequest.DONE){
            alert("resposta ok");
        }
    };
    let response = "";
    for(i of forms){
        if(i.name == "tipo") {
            if(i.value == "oferta")
                xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/registaoferta", true);
            else if(i.value == "procura")
                xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/registaprocura", true);
            continue;
        }
        if(i.type == 'submit') {
            continue;
        }
        response += i.name + '=' + i.value + "&";
    }
    response = response.slice(0, -1);
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/registaoferta", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    console.log(response);
    xhttp.send(response);
    return false;
}


//função para criar uma box para anúncio
function createBox(anuncio, src='images/house.png', href='#'){
    let box = document.createElement("div");
    box.classList.add("box");

    const a = document.createElement("a");
    a.href = href;
    box.appendChild(a);

    let info = document.createElement("div");
    info.id = anuncio.aid;
    a.appendChild(info);

    const img = document.createElement("img");
    img.src = src;
    a.appendChild(img);


    const ul = document.createElement("ul");

    let li = document.createElement("li");
    li.textContent = "Data: " + anuncio.data;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Género: " + anuncio.genero;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Detalhes: " + anuncio.detalhes;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Contacto: " + anuncio.contacto;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Anunciante: " + anuncio.anunciante;
    ul.appendChild(li);
    /*li = document.createElement("li");
    li.textContent = anuncio.aid.value;
    ul.appendChild(li);*/
    li = document.createElement("li");
    li.textContent = "Localização: " + anuncio.zona;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Tipo de alojamento: " + anuncio.tipo_alojamento;
    ul.appendChild(li);
    li = document.createElement("li");
    li.textContent = "Preço: " + anuncio.preco;
    ul.appendChild(li);

    info.appendChild(ul);

    return box;
}

//função para receber os anúncios do servidor
function getAnuncio(pesquisa) {
    var xhttp = new XMLHttpRequest();
    event.preventDefault();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            //alert("Resposta OK");
            alert(this.responseText);
            var data = JSON.parse(this.responseText);
            data = data.resultados;
            data.forEach(function (data) {
                document.getElementById('resultados').append(createBox(data));
            });
        }
    };
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/roomsearch", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    let response = "";
    for (i of pesquisa) {
        if (i.type == "submit")
            continue;
        response += i.name + "=" + i.value + "&";
    }
    response = response.slice(0, -1);
    xhttp.send(response);
}

//função para escolher os 3 anúncios mais recentes
function orderAnuncios(data) {
    let res = alasql("SELECT * FROM ? ORDER BY data LIMIT 3", [data]);
    return res;
}

//função para colocar os 3 anúncios na página principal
function mainOfertas(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          data = data.resultados;
          let order = orderAnuncios(data);
          order.forEach(function (order) {
             document.getElementById('ofertas').append(createBox(order));
             let anu = allAnuncio("http://alunos.di.uevora.pt/tweb/t1/anuncio?aid=" + order.aid, 0)
          });
      }
    };
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/roomsearch", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("tipo=oferta");
}

//função para colocar os 3 anúncios na página principal
function mainProcuras() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if(this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.responseText);
            data = data.resultados;
            let order = orderAnuncios(data);
            order.forEach(function (order) {
                document.getElementById('procuras').append(createBox(order));
                let anu = allAnuncio("http://alunos.di.uevora.pt/tweb/t1/anuncio?aid=" + order.aid, 1);
            });
        }
    };
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/roomsearch", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send("tipo=procura");
}

//função que, quando se clica no anúncio, mostra os detelhes todos e permite que se mande mensagem
/*function allAnuncio(url, tipo) {
    let aid = url.replace("http://alunos.di.uevora.pt/tweb/t1/anuncio?aid=", "");
    console.log(aid);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if(this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          data = data.resultados;
          //console.log(data);
          let anuncio;
          data.forEach(function (data) {
              if(data.aid == aid) {
                  anuncio = data;
              }
          });
          console.log(anuncio);
      }
    };
    xhttp.open("POST", "http://alunos.di.uevora.pt/tweb/t1/roomsearch", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if(tipo == 1) {
        xhttp.send("tipo=procura");
    }
    else if(tipo == 0) {
        xhttp.send("tipo=oferta");
    }
}*/
/*
<div class="box">
        <img src="images/house.png" alt="Houses">
        <div id="pinfo2">
            <ul>
                <li>Tipo</li>
                <li>Arrendatário</li>
                <li>Localização</li>
                <li>Preço</li>
                <li>Anunciante</li>
                <li>Contacto</li>
                <li>Data de anúncio</li>
                <li>Descrição</li>
            </ul>
        </div>
    </div>
 */