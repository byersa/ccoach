// cc/modules/main/registerModule
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Register module
 */
define(
    [
        // requirements;
        'dojo/_base/declare',
        'cc/extensions/Module',

        // dependencies;
        'cc/modules/main/presenters/RegisterPresenter',
        'dijit/layout/TabContainer'
    ],

    function(declare, Module){

        return declare('cc.modules.main.registerModule', Module, {

            context: 'cc/contexts/main/registerContext.xml'
        });
    }
);