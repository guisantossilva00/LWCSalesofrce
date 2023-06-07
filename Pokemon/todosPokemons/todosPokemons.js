import { LightningElement, wire } from 'lwc';
import getPokemons from '@salesforce/apex/PokeApi.getPokemons';
import PokebolaCarregamentoGif from '@salesforce/resourceUrl/PokebolaCarregamento';

export default class TodosPokemons extends LightningElement {
    pokemons;
    erro;
    detalhePokemon = false;
    infoPokemon;
    carregamento = PokebolaCarregamentoGif;

    @wire(getPokemons)
    retornoPokemon({error, data}) {
        if(data) {
            this.pokemons = data;
            this.erro = undefined;
        } else if(error) {
            this.erro = error;
            this.pokemons = undefined;
        }
    }

    handlePokemonSelecionado(value) {
        this.infoPokemon = value.detail;
        this.detalhePokemon = !this.detalhePokemon;                                                    
    }

    abrirFecharModal() {
        this.detalhePokemon = !this.detalhePokemon;  
    }
}