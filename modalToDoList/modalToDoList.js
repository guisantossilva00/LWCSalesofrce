import { LightningElement , api} from 'lwc';
import atualizarTarefa from '@salesforce/apex/ToDoListConfig.atualizarTarefa';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalToDoList extends LightningElement {
    @api getTarefa;
    valorInput = '';

    atualizar(event) {
        const IdTarefa = event.currentTarget.dataset.id;

        atualizarTarefa({NomeTarefas: this.valorInput, Id : IdTarefa}).then(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Sucesso',
                message: 'Tarefa Atualizada!',
                variant: 'success'
            }));

            window.location.reload(true);
        }).catch(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Erro',
                message: 'Erro ao Atualizar a Tarefa',
                variant: 'error'
            }));
        });
    }

    inputAdd(event) {
        this.valorInput = event.target.value;
    }

}