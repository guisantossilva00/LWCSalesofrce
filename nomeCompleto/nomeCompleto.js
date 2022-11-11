import { LightningElement } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi'
import LEAD_OBJECT from '@salesforce/schema/Lead';
import FIRSTNAME_FIELD from '@salesforce/schema/Lead.FirstName';
import LASTNAME_FIELD from '@salesforce/schema/Lead.LastName';
import COMPANY_FIELD from '@salesforce/schema/Lead.Company';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class NomeCompleto extends LightningElement {
    firstName = '';
    lastName = '';
    empresa = '';

    // objectApiName = LEAD_OBJECT;
    // fields = [FIRSTNAME_FIELD, LASTNAME_FIELD, COMPANY_FIELD];

    getName(event) {
        const campo = event.target.name;
        if (campo === "nome") {
            this.firstName = event.target.value;
        } else if (campo === "sobrenome") {
            this.lastName = event.target.value;
        } else if (campo === "empresa") {
            this.empresa = event.target.value
        }
    }

    reset() {
        this.firstName = '';
        this.lastName = '';
        this.empresa = '';
    }

    salvar() {
        const recordInput = {
            apiName: LEAD_OBJECT.objectApiName,
            fields: {
                [FIRSTNAME_FIELD.fieldApiName] : this.firstName, 
                [LASTNAME_FIELD.fieldApiName] : this.lastName,
                [COMPANY_FIELD.fieldApiName] : this.empresa
            }
        };
        createRecord(recordInput).then(lead => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Sucesso!',
                    message: 'Lead criado com sucesso',
                    variant: 'success'
                })
            )
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Falha ao criar o registro',
                    message: error.body.message,
                    variant: 'error'
                })
            )
        })
    }
    
    get setNomeCompleto() {
        return this.empresa ? `${this.firstName} ${this.lastName} da ${this.empresa}`.toUpperCase() : '';
    }

}