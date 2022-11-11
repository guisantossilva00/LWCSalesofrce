import { LightningElement } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import wallpapers from '@salesforce/resourceUrl/wallpaper';
import bootstrap from '@salesforce/resourceUrl/bootstrap';
// import jquery from '@salesforce/resourceUrl/jquery'

export default class TestBootStrap extends LightningElement {
    async renderedCallback() {
        Promise.all([
            // loadScript(this, jquery),
            loadStyle(this, bootstrap + '/bootstrap-5.2.2-dist/css/bootstrap.min.css'),
            loadScript(this, bootstrap + '/bootstrap-5.2.2-dist/js/bootstrap.js'),
        ]).then(() => {
            console.log('bootstap rodando');
        })
    }

    appResources = {
        teste1 : `${wallpapers}/a.jpg`,
        teste2 : `${wallpapers}/b.jpg`,
        teste3 : `${wallpapers}/c.jpg`,
    };
}