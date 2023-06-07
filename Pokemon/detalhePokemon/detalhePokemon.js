import { LightningElement, api } from 'lwc';
import PokebolaCapturandoGif from '@salesforce/resourceUrl/PokebolaCapturando';
import insertPokemon from '@salesforce/apex/PokeController.insertPokemon';
import insertHistoricoCaptura from '@salesforce/apex/PokeController.insertHistoricoCaptura';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class DetalhePokemon extends NavigationMixin(LightningElement) {
    _infoPokemon;
    imgCapturando = PokebolaCapturandoGif;
    capturando = false;
    disableButton = false;
    recordPageUrl;

    @api
    get infoPokemon() {
        return this._infoPokemon;
    }

    set infoPokemon(value) {
        this._infoPokemon = value;
    }

    connectCallback() {
        this.capturaPokemon();
    }

    fecharModal(value) {
        const event = new CustomEvent('fecharmodal');

        this.dispatchEvent(event);
    }

    async capturaPokemon(value) {
        this.disableParaCaptura();

        let experience =  value.currentTarget.dataset.experience;
        let name = this._infoPokemon.name;
        let idPokemon = this._infoPokemon.id;
        let altura = this._infoPokemon.height;
        let peso = this._infoPokemon.weight;
        let urlImage = this._infoPokemon.sprites.other.home.front_default;
        let tipos = this._infoPokemon.types.map((tipo) => tipo.type.name );
        let hp, atq, def, atqEspecial, defEspecial, velocidade, idRegistroPokemon;

        this._infoPokemon.stats.forEach((poke) => {
            if(poke.stat.name == 'hp') hp = poke.base_stat;
            if(poke.stat.name == 'attack') atq = poke.base_stat;
            if(poke.stat.name == 'defense') def = poke.base_stat;
            if(poke.stat.name == 'special-attack') atqEspecial = poke.base_stat;
            if(poke.stat.name == 'special-defense') defEspecial = poke.base_stat;
            if(poke.stat.name == 'speed') velocidade = poke.base_stat;
        });

        await this.sleep(3000);
        
        if(experience >= 300) {
            if(this.dificuldadeCapturarPokemon(experience, 10) >= experience) {
                const results = await insertPokemon({name: name, idPokemon: idPokemon, altura: altura, peso: peso, urlImage: urlImage, experienciaBase: experience, tipos: tipos, hp: hp, atq: atq, def: def, atqEspecial: atqEspecial, defEspecial: defEspecial, velocidade: velocidade})

                if(results !== null) {
                    this.gerarUrlRegistroPokemon(results);  
                    await this.sleep(1000);
                    this.showToastSuccess(name);
                } else {
                    this.showToastAlert();
                }

            } else {
                insertHistoricoCaptura({nome: name, urlImagem: urlImage, status: 'Escapou'});
                this.showToastError(name);
            }
            
        } else if (experience >= 230) {
            if(this.dificuldadeCapturarPokemon(experience, 20) >= experience) {
                const results = await insertPokemon({name: name, idPokemon: idPokemon, altura: altura, peso: peso, urlImage: urlImage, experienciaBase: experience, tipos: tipos, hp: hp, atq: atq, def: def, atqEspecial: atqEspecial, defEspecial: defEspecial, velocidade: velocidade})

                if(results !== null) {
                    this.gerarUrlRegistroPokemon(results);  
                    await this.sleep(1000);
                    this.showToastSuccess(name);
                } else {
                    this.showToastAlert();
                }

            } else {
                insertHistoricoCaptura({nome: name, urlImagem: urlImage, status: 'Escapou'});
                this.showToastError(name);
            }

        } else if (experience >= 150) {
            if(this.dificuldadeCapturarPokemon(experience, 30) >= experience) {
                const results = await insertPokemon({name: name, idPokemon: idPokemon, altura: altura, peso: peso, urlImage: urlImage, experienciaBase: experience, tipos: tipos, hp: hp, atq: atq, def: def, atqEspecial: atqEspecial, defEspecial: defEspecial, velocidade: velocidade})

                if(results !== null) {
                    this.gerarUrlRegistroPokemon(results);  
                    await this.sleep(1000);
                    this.showToastSuccess(name);
                } else {
                    this.showToastAlert();
                }

            } else {
                insertHistoricoCaptura({nome: name, urlImagem: urlImage, status: 'Escapou'});
                this.showToastError(name);
            }

        } else {
            if(this.dificuldadeCapturarPokemon(experience, 40) >= experience)  {
                const results = await insertPokemon({name: name, idPokemon: idPokemon, altura: altura, peso: peso, urlImage: urlImage, experienciaBase: experience, tipos: tipos, hp: hp, atq: atq, def: def, atqEspecial: atqEspecial, defEspecial: defEspecial, velocidade: velocidade})

                if(results !== null) {
                    this.gerarUrlRegistroPokemon(results);  
                    await this.sleep(1000);
                    this.showToastSuccess(name);
                } else {
                    this.showToastAlert();
                }

            } else {
                insertHistoricoCaptura({nome: name, urlImagem: urlImage, status: 'Escapou'});
                this.showToastError(name);
            }
        }
        this.disableParaCaptura();
        this.fecharModal();        
    }

    disableParaCaptura() {
        this.capturando = !this.capturando;
        this.disableButton = !this.disableButton;
    }

    dificuldadeCapturarPokemon(experience, dificuldade) {
        let resultado = Math.floor(Math.random() * experience + dificuldade);
        return resultado;
    }

    gerarUrlRegistroPokemon(idRegistroPokemon) {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: 'MeuPokemon__c',
                recordId: idRegistroPokemon,
                actionName: 'view',
            }
        }).then(url => {
            this.recordPageUrl = url;   
        });
    }

    showToastError(name) {
        const event = new ShowToastEvent({
            title: 'Pokemon escapou',
            message: `O pokemon ${name}, acabou fugindo.` ,
            variant: 'error',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    showToastAlert() {
        const event = new ShowToastEvent({
            title: 'Falha ao Capturar',
            message: `Ocorreu um erro inesperado ao capturar um pokemon`,
            variant: 'warning',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }
    showToastSuccess(name) {
        const event = new ShowToastEvent({
            title: 'Pokemon Capturado',
            message: `O pokemon ${name}, foi capturado. Para acessar o registro: {0}`,
            messageData: [
                {
                    url: this.recordPageUrl,
                    label: 'Clique aqui',
                },
            ],
            variant: 'success',
            mode: 'dismissable'
        });
        this.dispatchEvent(event);
    }

    sleep(mls) {
        return new Promise(resolve => {
            setTimeout(resolve, mls);
        })
    }
}