import { LightningElement, wire } from 'lwc';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class WireWithFunction extends LightningElement {
    accounts;
    erro;

    @wire(getAccountList) 
    wiredAccounts({error, data}) {
        if(data) {
            this.accounts = data;
            this.erro = undefined;
        } else if(error) {
            this.erro = error;
            this.accounts = undefined;
        }
    }
}