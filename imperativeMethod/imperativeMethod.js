import { LightningElement } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class ImperativeMethod extends LightningElement {
    accounts;
    erro;

    buttonClick() {
        getAccountList().then((results) => {
            this.accounts = results;
            this.erro = undefined;
        }).catch((error) => {
            this.erro = error;
            this.accounts = undefined;
        });
    }   
}