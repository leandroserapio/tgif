var app = new Vue({
  el: '#app',
  data:{
      estadisticas: {
      cantRep: 0,
      cantDem: 0,
      cantTotal: 0,
      promVotosDem: 0,
      promVotosRep: 0,
      promVotosTot: 0,
      
      leastLoyal: [],
      mostLoyal: [],
  },
  memberList: [],
  vectordemocrata: [],
  vectorrepublicano: [],
  vectorindependientes: [],
  }
});


fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
  method: "GET",
  headers: new Headers({
    "X-API-Key": "adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa"
  })
})
  .then(function (response) {
    if (response.ok) return response.json();
    throw new Error(response.statusText);
  })
  .then(function (json) {
    console.log(json);
    app.memberList = json.results[0].members;
    app.vectordemocrata = app.memberList.filter(estadisticaDem);
    app.vectorrepublicano = app.memberList.filter(estadisticaRep);

    votosDemocratas = app.vectordemocrata.map(mapeoVotosD);
    promedioVotosDem = votosDemocratas.reduce(promediandoVotosDem);
    votosRepublicanos = app.vectorrepublicano.map(mapeoVotosR);
    promedioVotosRep = votosRepublicanos.reduce(promediandoVotosRep);

    ordenVotosMenos = app.memberList.sort(ordenandoVotosMenos);
    elDiezQueMenosVoto = ordenVotosMenos.slice(0, app.memberList.length * 0.1);
    ordenVotosMas = app.memberList.sort(ordenandoVotosMas);
    elDiezQueMasVoto = ordenVotosMas.slice(0, app.memberList.length * 0.1);

    allmystats();
    // mostrarRepresentantes();
    // mostrarleastEngaged();
    // mostrarMostEngaged();
    console.log(estadisticas)

  });

//Ejercicio 1//////////////////////////////
function estadisticaDem(member) {
  return member.party == "D";
}
function estadisticaRep(member) {
  return member.party == "R";
}
//Ejecicio 2//////////////////////////////
function mapeoVotosD(votos) {
  return votos.votes_with_party_pct
}
function promediandoVotosDem(a, b) {
  return a + b;
}
function mapeoVotosR(votos) {
  return votos.votes_with_party_pct
}
function promediandoVotosRep(a, b) {
  return a + b;
}
//Ejercicio 3//////////////////////////////
function ordenandoVotosMenos(a, b) {
  return a.votes_with_party_pct - b.votes_with_party_pct;
}
function ordenandoVotosMas(a, b) {
  return b.votes_with_party_pct - a.votes_with_party_pct;
}

//Cargando valores en el Objeto estadisticas
function allmystats() {
  app.estadisticas.cantDem = app.vectordemocrata.length;
  app.estadisticas.cantRep = app.vectorrepublicano.length;
  app.estadisticas.cantTotal = app.memberList.length;
  app.estadisticas.promVotosDem = (promedioVotosDem / votosDemocratas.length).toFixed(2);
  app.estadisticas.promVotosRep = (promedioVotosRep / votosRepublicanos.length).toFixed(2);
  app.estadisticas.promVotosTot = (((promedioVotosDem / votosDemocratas.length) + (promedioVotosRep / votosRepublicanos.length)) / 2).toFixed(2);

  app.estadisticas.leastLoyal = elDiezQueMenosVoto;
  app.estadisticas.mostLoyal = elDiezQueMasVoto;
}




