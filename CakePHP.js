/**
 * Created by domagoj on 3/4/14.
 */
Number.prototype.isDefined = function(){
    if (this != "undefined" && this !=  null){
        return true;
    }else{
        return false;
    }
}

var RootObjectManager = (function(){

    var _models = [];
    var _currentIndex = [];


    function _isRootInitialized(id){
        if (typeof _models[id] !== 'undefined'){
            return true;
        }else{
            return false;
        }
    }

    return {
        addModel: function addModel(id, model) {
            if (!_isRootInitialized(id)) {
                _models[id] = [];
                _currentIndex[id] = 0;
            }
            _models[id].push(model);
        },
        getModels: function getModels(id) {
            return _models[id]
        },
        getModel: function getModel(id, modelId) {
            for (var key in _models[id]) {
                if (_models[id][key].equalsById(modelId)) {
                    return _models[id][key];
                }
            }
            return null;
        },
        hasNextTag : function(id){
            if (_currentIndex[id] < _models[id].length){
                return true;
            }
            return false;
        },
        nextTag : function(id){
            if (this.hasNextTag(id)){
                return _models[id][_currentIndex[id]++];
            }else{
                this.resetTag(id);
            }
            return null;
        },
        resetTag : function(id){
            if ( _models[id].length > 0)
                _currentIndex[id] = 0;
            else
                _currentIndex[id] = -1;
        }
    }
})();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


// Object.prototype.isFunction = function(fnc){
//     if (typeof fnc == 'function'){
//       return true;
//     }else{
//       return false;
//     }
// }


//CakePHP module
var CakePhpHtml = (function(){

    function _createTag(tag, value, name, id, attributes){
        var $return =
            '<'+tag +
            _attribute("name", name) +
            _attribute("id", id);
        for (var key in attributes) {
            $return += this._attribute(key, attributes[key]);
        }
        $return += ">";
        $return += value + '</' + tag + ">";
        return $return;
    }

    function _createEmptyTag(tag, value, name, id, attributes){
        var $return =
            '<'+tag +
            _attribute("name", name) +
            _attribute("id", id)+
            _attribute("value", value);
        for (var key in attributes) {
            $return += ' ' + key + '="' + attributes[key] + '"';
        }
        return $return + ">";
    }

    function _attribute(name, value){
        if (value != "undefined" && value !=  null){
            return ' ' + name + '="' + value + '"'
        }else{
            return "";
        }
    }

    return {
        id: function getId(alias, attribute, index) {
            var attributes = attribute.split("_");
            var $return = alias.capitalize();
            for (var key in attributes) {
                //console.log(attributes[key]);
                $return += index + attributes[key].capitalize();
            }
            return $return;
        },
        name: function getName(alias, attribute, index) {
            if (index != null && index != "undefined") {
                return "data[" + alias + "][" + index + "][" + attribute + "]";
            } else {
                return "data[" + alias + "][" + attribute + "]";
            }

        },
        hidden: function getHidden() {
            var data = this.getData();
            var $hidden = "";
            for (var key in  data) {
                $hidden += _createEmptyTag
                (
                    "input",
                    data[key],
                    this.name(this.getAlias(), key),
                    this.id(this.getAlias(), key),
                    {type: "hidden"}
                )
            }
            return $hidden;
        },
        /**
         *
         * @param attribute
         * @returns Html, input type=hidden
         */
        createHidden: function (attribute) {
            var alias = this.getAlias();
            return _createEmptyTag("input", this.getData()[attribute], this.name(alias, attribute), this.id(alias, attribute), {type: "hidden"});
        },
        createHiddenInputs : function(alias, model, index){
            var $returnHtml = '';

            for(var key in model){
                //console.log("Vrijednost varijable index "  + index);
                var name,id;
                if (index != "undefined" && index != null){
                    name = this.name(alias, key, index);
                    id = this.id(alias, key, index);
                }else{
                    name = this.name(alias, key);
                    id = this.id(alias, key);
                }

                $returnHtml +=
                _createEmptyTag(
                    "input",    //tag type
                    model[key], //value
                    name,       // tag name
                    id,         //tag id
                    {type: "hidden"}); //additional tag attributes
            }
            return $returnHtml;
        }
    }
})();


exports.RootObjectManager = RootObjectManager;
exports.CakePhpHtml = CakePhpHtml;
