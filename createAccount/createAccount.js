import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import CONTA_OBJETO from '@salesforce/schema/Account';
import NAME_CAMPO from '@salesforce/schema/Account.Name';
import PHONE_CAMPO from '@salesforce/schema/Account.Phone';
import REVENUE_CAMPO from '@salesforce/schema/Account.AnnualRevenue';

export default class CreateAccount extends LightningElement {
    apiNomeObjeto = CONTA_OBJETO;
    campos = [NAME_CAMPO, PHONE_CAMPO, REVENUE_CAMPO];

    funcaoSucesso(event) {
        const toasEvent = new ShowToastEvent({
            title: "Conta criado com sucesso !",
            message: "Conta Criada: ",
            variant: "success"
        });

        this.dispatchEvent(toasEvent);
    }
}