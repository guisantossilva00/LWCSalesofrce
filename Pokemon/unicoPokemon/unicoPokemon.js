import { LightningElement, api } from 'lwc';

export default class UnicoPokemon extends LightningElement {
    _pokemon;

    @api
    get pokemon() {
        return this._pokemon;
    }

    set pokemon(value) {
        this._pokemon = value;
    }

    clickPokemon(value) {
        const event = new CustomEvent('pokemonselecionado', {
            detail: this._pokemon
        });

        this.dispatchEvent(event);
    }
}