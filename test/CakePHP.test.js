/**
 * Created by domagoj on 6/22/14.
 */

var expect = require('chai').expect;
var assert = require('chai').assert;

var cake = require('../CakePHP.js').RootObjectManager;
var cakeHtml = require('../CakePHP.js').CakePhpHtml;
var Model = require('../Model').Model;

describe('CakeHtml', function(){

    describe('#getModel(id, modelId)', function(){
        it ("should add object of type model to CakeHtml", function(){
            cake.addModel(1, new Model ("Firm", {id : 1, name : "Tvrtka d.o.o.", address : "Zagreb"}));
            //console.log(cake);
            var model = cake.getModel(1,1);
            expect(model.getData()).to.have.a.property("id", 1);
            expect(model.getData()).to.have.a.property("name", "Tvrtka d.o.o.");
        });
    });

    describe('#getModels(id)', function(){
        it ("should add object of type model to CakeHtml, and retrive list of objects", function(){
            cake.addModel(1, new Model ("Firm", {id : 2, name : "Mamlaz d.o.o.", address : "Zagreb"}));

            //console.log(cake);
            var models = cake.getModels(1);
            expect(models).to.have.a.property("length", 2);
        });
    });

    describe('#hasNextTag(id)', function(){
        it ("checks to see if the Cake object has next element for creating a tag(input)", function(){

            assert.ok(cake.hasNextTag(1));
        });
    });

    describe('#hasNextTag(id)', function(){
        it ("checks to see if the Cake object has next element for creating a tag(input)", function(){
            while(cake.hasNextTag(1)){
                var model = cake.nextTag(1);
                //console.log(cakeHtml.id(model.metaName, "id") );
            }

            assert.notOk(cake.hasNextTag(1))

        });
    });

        describe('#createHiddenInputs', function(){
        it ("checks to see if the Cake object has next element for creating a tag(input)", function(){
            var models = cake.getModels(1);
            for (var i = 0; i < models.length; i++){
                console.log(cakeHtml.createHiddenInputs(models[i].metaName, models[i].getData(), i ));
            }

            assert.notOk(cake.hasNextTag(1))

        });
    });
});
