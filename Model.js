/**
 * Created by domagoj on 13.07.14..
 */
function Model(modelName, data){
    this.id = data.id;
    this.metaName = modelName;

    this.data = data
}

Model.prototype.getData =  function(){
  return this.data;
}

Model.prototype.toString = function(){
    var returnString = "{\n";
    for (var key in this){
        if (typeof this[key] != "function"){
            returnString += "\t" + key +" : "+this[key] + "\n";
        }
    }
    return returnString + "\n}";
}

Model.prototype.equals = function(model){
    if (model.id !=  "undefined" && this.id != "undefined"){
        if (this.id = model.id){
            return true;
        }
    }

    return false;
}

Model.prototype.equalsById = function(id){
    if (this.id !=  "undefined"){
        if (this.id = id){
            return true;
        }
    }
    return false;
}

exports.Model = Model;
