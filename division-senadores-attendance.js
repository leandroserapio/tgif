var app = new Vue({
    el: '#app',
    data:{
        estadisticas: {
        cantRep: 0,
        cantDem: 0,
        cantInd: 0,
        cantTotal: 0,
        promVotosDem: 0,
        promVotosRep: 0,
        promVotosInd: 0,
        promVotosTot: 0,
        
        leastEngaged: [],
        mostEngaged: [],
    },
    memberList: [],
    vectordemocrata: [],
    vectorrepublicano: [],
    vectorindependientes: [],
    }
});

fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
    method: "GET",
    headers: new Headers({
        "X-API-Key": "adZUIoKPgkk0ecKXE0ztm9ErLNJgARlsKHBhTBYa"
    })
})
    .then(function (response) {
        if (response.ok) return response.json();
        throw new Error(response.statusText);
    })
    .then(function (data) {
        console.log(data);
        app.memberList = data.results[0].members;
        //Ejercicio 1
        app.vectordemocrata = app.memberList.filter(estadisticaDem);
        app.vectorrepublicano = app.memberList.filter(estadisticaRep);
        app.vectorindependientes = app.memberList.filter(estadisticaInd);
        // //Ejercicio 2
        votosDemocratas = app.vectordemocrata.map(mapeoVotosD);
        promedioVotosDem = votosDemocratas.reduce(promediandoVotosDem);
        votosRepublicanos = app.vectorrepublicano.map(mapeoVotosR);
        promedioVotosRep = votosRepublicanos.reduce(promediandoVotosRep);
        votosIndependientes = app.vectorindependientes.map(mapeoVotosI);
        promedioVotosInd = votosIndependientes.reduce(promediandoVotosInd);
        // //Ejercicio 3
        ordenVotosMenos = app.memberList.sort(ordenandoVotosMenos);
        elDiezQueMenosVoto = ordenVotosMenos.slice(0, app.memberList.length * 0.1);
        ordenVotosMas = app.memberList.sort(ordenandoVotosMas);
        elDiezQueMasVoto = ordenVotosMas.slice(0, app.memberList.length * 0.1);

        allmystats();
        console.log(app.estadisticas);

    });

//Ejercicio 1//////////////////////////////
function estadisticaDem(member) {
    return member.party == "D";
}
function estadisticaRep(member) {
    return member.party == "R";
}
function estadisticaInd(member) {
    return member.party == "I";
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
function mapeoVotosI(votos) {
    return votos.votes_with_party_pct
}
function promediandoVotosInd(a, b) {
    return a + b;
}
//Ejercicio 3//////////////////////////////
function ordenandoVotosMenos(a, b) {    
    return b.missed_votes_pct - a.missed_votes_pct;
}
function ordenandoVotosMas(a, b) {
    return a.missed_votes_pct - b.missed_votes_pct;
}
//Cargando valores en el Objeto estadisticas
function allmystats() {
    app.estadisticas.cantDem = app.vectordemocrata.length;
    app.estadisticas.cantRep = app.vectorrepublicano.length;
    app.estadisticas.cantInd = app.vectorindependientes.length;

    app.estadisticas.cantTotal = app.memberList.length;
    app.estadisticas.promVotosDem = (promedioVotosDem / votosDemocratas.length).toFixed(2);
    app.estadisticas.promVotosRep = (promedioVotosRep / votosRepublicanos.length).toFixed(2);
    app.estadisticas.promVotosInd = (promedioVotosInd / votosIndependientes.length).toFixed(2);
    app.estadisticas.promVotosTot = (((promedioVotosDem / votosDemocratas.length) + (promedioVotosRep / votosRepublicanos.length) + (promedioVotosInd / votosIndependientes.length)) / 3).toFixed(2);

    app.estadisticas.leastEngaged = elDiezQueMenosVoto;
    app.estadisticas.mostEngaged = elDiezQueMasVoto;
}
