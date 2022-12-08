const btnEnviar = document.getElementById('btnEnviar')
const btnReceber = document.getElementById('btnReceber')
const valorLitro = document.getElementById('valorLitro')
const quantidadeAbastecida = document.getElementById('quantidadeAbastecida')
const tabelaDeResultado = document.getElementById('tabelaDeResultado')
const quilometragem = document.getElementById('quilometragem')

const dataDeAbastecimento = Date.now()

let docArray = []

//btnEnviar.addEventListener('click', e => sendDataToFirebase())
//btnReceber.addEventListener('click', e => getFirebaseData())





/*---------------------------------------Send data to firebase----------------------------------------------*/
const sendDataToFirebase = () => {
    let valor = valorLitro.value
    let quantidade = quantidadeAbastecida.value
    let odometro = quilometragem.value

    if(valor === 0 || valor === '' || quantidade === 0 || quantidade === '') {
        alert('Selecione valores válidos!')
        return
    }

    db.collection(firebase.auth().currentUser.uid).add({
        dataDeAbastecimento: dataDeAbastecimento,
        valorLitro: valor,
        quantidadeAbastecida: quantidade,
        quilometragem: odometro
    })
    .then(() => {
        successSignal()
    })
    .then(() => {
        document.location.reload()
    })
    .catch(err => {
		failedSignal()
	})
    
}
/*----------------------------------------------------------------------------------------------------------*/





/*---------------------------------Print Success or Fail Signal to screen-----------------------------------*/
const successSignal = () => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Abastecimento cadastrado!',
        showConfirmButton: false,
        timer: 1500
    })
}
const failedSignal = () => {
    Swal.fire({
        position: 'center',
        icon: 'error',
        title: "Erro ao tentar cadastrar o abastecimento!",
        showConfirmButton: false,
        timer: 1500
    })
}
/*----------------------------------------------------------------------------------------------------------*/





/*------------------------------------Print data from firebase----------------------------------------------*/
const printFirebaseData = () => {
    if(docArray === []) return
    tabelaDeResultado.style.display = "block"
    tabelaDeResultado.innerHTML = '<th>Data</th><th>Litros</th><th>Valor</th><th>Total</th><th>KM</th><th>Distância</th><th>KM/L</th>'
    
    docArray.forEach((item, index) => {
        let data = new Date(docArray[index].dataDeAbastecimento).toLocaleString()
        let quant = docArray[index].quantidadeAbastecida
        let val = docArray[index].valorLitro
        let valAbas = Number(docArray[index].valorLitro * docArray[index].quantidadeAbastecida).toFixed(2)
        let km = docArray[index].quilometragem
        let dist
        index === docArray.length ? dist = km : dist = Number(docArray[index].quilometragem - docArray[index+1].quilometragem).toFixed(2)
        let kml = Number(dist/quant).toFixed(2)

        tabelaDeResultado.innerHTML += `
            <tr>
                <td>${data}</td>
                <td>${quant}</td>
                <td>${val}</td>
                <td>${valAbas}</td>
                <td>${km}</td>
                <td>${dist}</td>
                <td>${kml}</td>
            </tr>
        `
    });
    doc
}
/*----------------------------------------------------------------------------------------------------------*/




/*--------------------------------------Get data from firebase----------------------------------------------*/
const getFirebaseData = () => {
    docArray = []
	db.collection(firebase.auth().currentUser.uid).get()
	.then( snapshot => {
    	const listaDeAbastecimento = snapshot.docs.reduce((acc, doc) => {
	        let docData = {
	            dataDeAbastecimento: doc.data().dataDeAbastecimento,
	            valorLitro: doc.data().valorLitro,
	            quantidadeAbastecida: doc.data().quantidadeAbastecida,
                quilometragem: doc.data().quilometragem
	        }
        docArray.push(docData)
		}, '')
	
	docArray.sort((a, b) => b.dataDeAbastecimento - a.dataDeAbastecimento)
	
	console.log(docArray)

    printFirebaseData()
	})
}
/*----------------------------------------------------------------------------------------------------------*/





/*----------------------------------------Check if and Log In-----------------------------------------------
firebase.auth().onAuthStateChanged( user => {
  if (!user) logInToFirebase()
  else console.log('Logged')
})
----------------------------------------------------------------------------------------------------------*/