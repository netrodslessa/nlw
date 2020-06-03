function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json()) // função anonima retornando um valor, a versão maior é (res) => {return res.json()}
        .then(states => {

            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    const ufValue = event.target.value
    // a cont ufValue pega o valor do select uf e o url muda a url setando o valor do select uf
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    fetch(url).then(res => res.json())
        .then(cities => {
            // corrigi o bug limpando o campo cidade quando estado é trocado
            citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
            citySelect.disabled = true
            // fim da correção
            for (const city of cities) {
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }
            // abilita o campo cidade
            citySelect.disabled = false;

        })
}

document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's
const itemsToColect = document.querySelectorAll('.items-grid li')


for (const item of itemsToColect) {
    item.addEventListener('click', handleSelectedItems)
}

// pegar o campo escondido com os itens selecionados
const collectedItems = document.querySelector('input[name=]items')

// selecionando items dos itens de coleta
let selectedItems = []

// função de seleção de itens
function handleSelectedItems(e) {
    const itemLi = event.target
    // adicionando uma classe ao objeto, isso ajuda a não precisar configurar o style por aqui.
    // adicionar ou remover uma classe com Javascript
    itemLi.classList.toggle('selected') //dentro do TOGGLE posso inserir ou remover qual classe preciso
    // itemLi.classList.add => para somente adicionar
    // itemLi.classList.remove => para somente remover

    // dataset.id pega o valor do id
    const itemId = itemLi.dataset.id

    // verificar se tem itens selecionados, se sim, 
    // pegar os itens selecionados
    // alreadySelected = Já foi selecionado 
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // isso sera true ou false
        return itemFound
    })

    // se já estiver selecionado, tirar da seleção 
    if (alreadySelected >= 0) {
        // tirar da seleção
        const filteredItems = selectedItems.filter(item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    } else {
        // se não estiver selecionado
        //adicionar à seleção
        selectedItems.push(itemId)
    }
    // console.log(selectedItems)mostra o que foi selecionado

    // atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems;
}