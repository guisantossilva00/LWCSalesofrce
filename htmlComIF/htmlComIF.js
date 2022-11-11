import { LightningElement } from 'lwc';

export default class HtmlComIF extends LightningElement {
    areDetailsVisible = false;

    handleChange(event) {
        this.areDetailsVisible = event.target.checked;
    }
}