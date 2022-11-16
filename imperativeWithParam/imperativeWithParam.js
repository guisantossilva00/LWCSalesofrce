import { LightningElement } from 'lwc';
import findAccountList from '@salesforce/apex/AccountController.findAccList';

export default class ImperativeWithParam extends LightningElement {
    searchKey = '';
    accounts;
    erro;

    handleonchange(event) {
        this.searchKey = event.target.value;
    }

    buttonClick() {
        findAccountList({keyword : this.searchKey}).then((results) => {
            this.accounts = results;
            this.erro = undefined;
        }).catch((error) => {
            this.erro = error;
            this.accounts = undefined;
        });
    }   
}