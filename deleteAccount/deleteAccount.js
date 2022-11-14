import { LightningElement, wire } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import { deleteRecord } from 'lightning/uiRecordApi';
import getAccountList from '@salesforce/apex/AccountController.getAccountList';

export default class DeleteAccount extends LightningElement {
    accounts;
    error;
    wiredAccountsResult;

    @wire(getAccountList)
    wiredAccount(result) {
        this.wiredAccountsResult = result;
        if(result.data) {
            this.accounts = result.data;
            this.error = undefined;
        } else if(result.error) {
            this.error = result.error;
            this.accounts = undefined;
        }
    }

    deleteAccount(event) {
        const recorId = event.target.dataset.recordid;
        deleteRecord(recorId).then(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Success',
                message: 'Account Deleted',
                variant: 'success'
            }));

            return refreshApex(this.wiredAccountsResult);
        // eslint-disable-next-line no-unused-vars
        }).catch((error) => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Error',
                message: 'Error Deleting record',
                variant: 'error'
            }));
        })
    }
}