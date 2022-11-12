import { LightningElement, wire} from 'lwc';
import apiCepClass from '@salesforce/apex/apiCepRest.getCep';

// const DELAY = 300;

export default class ApiCepComApex extends LightningElement {
    cep = '';
    resultadoConsulta;
    error;

    @wire(apiCepClass , { cep : '$cep'}) 
    resultado({ error, data }) {
        if (data) {
            this.resultadoConsulta = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.resultadoConsulta = undefined;
        }
    }

    
    pegaCepHtml(event)  {
        window.clearTimeout(this.delayTimeout);
        this.cep = event.target.value;
        // this.delayTimeout = setTimeout(() => {
        //     this.cep = cep;
        // }, DELAY);
    }
}