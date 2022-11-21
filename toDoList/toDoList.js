import { LightningElement } from 'lwc';

import getQuantidadeNaoConcluido from '@salesforce/apex/ToDoListConfig.getQuantidadeNaoConcluido';
import criarTarefaApex from '@salesforce/apex/ToDoListConfig.criarTarefa';
import getTarefas from '@salesforce/apex/ToDoListConfig.getTarefas';
import deleteTarefa from '@salesforce/apex/ToDoListConfig.deleteTarefa';
import atualizarConcluido from '@salesforce/apex/ToDoListConfig.atualizarConcluido';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { loadScript } from 'lightning/platformResourceLoader';

export default class ToDoList extends LightningElement {
    quantidade;
    erro;
    valorInput = '';
    listaTarefas;

    connectedCallback() {
        this.getQuantidade();
        this.mostrarTarefas();

        Promise.all([
            loadScript(this,'https://kit.fontawesome.com/4066e8e8b1.js'),
        ]).then(() => {
            console.log('fontawesome rodando');
        })
    }

    getQuantidade() {
        getQuantidadeNaoConcluido().then((results) => {
            this.quantidade = results;
        }).catch(error => {
            this.erro = error;
            this.quantidade = undefined;
        }) 
    }

    mostrarTarefas() {
        getTarefas().then((results) => {
            this.listaTarefas = results;
        }).catch(error => {
            this.erro = error;
            this.listaTarefas = undefined;
        }) 
    }

    criarTarefa(){
        criarTarefaApex({NomeTarefas : this.valorInput}).then(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Sucesso',
                message: 'Tarefa Criada!',
                variant: 'success'
            }));

            window.location.reload(true);
        }).catch(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Erro',
                message: 'Erro ao Criar a Tarefa',
                variant: 'error'
            }));
        })
    }

    inputAdd(event) {
        this.valorInput = event.target.value;
    }

    deletarTarefa(event) {
        const IdTarefa = event.currentTarget.dataset.id;

        deleteTarefa({id : IdTarefa}).then(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Sucesso',
                message: 'Tarefa Deletada!',
                variant: 'success'
            }));

            window.location.reload(true);
        }).catch(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Erro',
                message: 'Erro ao Deletar a Tarefa',
                variant: 'error'
            }));
        });
    }

    updateConcluido(event) {
        const IdTarefa = event.currentTarget.dataset.id;

        atualizarConcluido({id : IdTarefa}).then(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Sucesso',
                message: 'Tarefa Concluida!',
                variant: 'success'
            }));

            window.location.reload(true);
        }).catch(() => {
            this.dispatchEvent( new ShowToastEvent({
                title: 'Erro',
                message: 'Erro ao Concluir a Tarefa',
                variant: 'error'
            }));
        });
    }


    editarTarefa(event) {

        const nameTarefa = event.currentTarget.dataset.nameedit;

        const modal = this.template.querySelector(`[data-name="${nameTarefa}"]`);
        modal.style.display = 'flex';
    }

    fecharModal(){
        const modal = this.template.querySelector(`.modal`);
        modal.style.display = 'none';
    }
} 