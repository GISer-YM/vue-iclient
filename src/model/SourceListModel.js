import WidgetModel from './WidgetModel'
import SourceModel from './SourceModel'
import LayerModel from './LayerModel'
class SourceListModel extends WidgetModel {
    constructor(options){
        super();
        this.map = options.map;
        this.style = this.map.getStyle();
        this.layers = this.map.getStyle().layers;
        this.detailLayers = null;
        this.sourceList = {}
        this._initLayers();
        this._initSource()
    }

    getSourceList(){
        return this.sourceList;
    }

    getLayers(){
        return this.detailLayers;
    }

    getLayersBySourceLayer(sourceName,sourceLayer){
        return this.sourceList[sourceName]['sourceLayerList'][sourceLayer]
    }

    getSourceLayersBySource(sourceName){
        return this.sourceList[sourceName]['sourceLayerList']
    }

    _initLayers(){
        this.layers && (this.detailLayers = this.layers.map(layer => {
           return this.map.getLayer(layer.id) 
        }));
    }

    _initSource(){
        this.detailLayers && this.detailLayers.forEach(layer => {
            if(!this.sourceList[layer['source']]){
                this.sourceList[layer['source']] = new SourceModel({
                    source:layer['source'],
                })
            }
            this.sourceList[layer['source']].addLayer(new LayerModel(layer),layer['sourceLayer']);
        });
    }
}
export default SourceListModel;