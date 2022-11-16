import { LightningElement, wire } from 'lwc';
import findAccountList from '@salesforce/apex/AccountController.findAccList';

export default class WireWithParams extends LightningElement {
    searchKey = '';
    erro;

    @wire(findAccountList, {keyword: '$searchKey'}) 
    accounts;

    handleonchange(event) {
        this.searchKey = event.target.value;
    }
}