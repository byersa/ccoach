// cc/modules/dashboard/myAccountModule;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview My Account module
 */
define(
    [
        // requirements;
        'dojo/_base/declare',
        'cc/extensions/Module',

        // dependencies;
        'dojox/grid/EnhancedGrid',
        'cc/modules/dashboard/presenters/ContactPresenter'
    ],

    function(declare, Module){

        return declare('cc.modules.dashboard.myAccountModule', Module, {

            context: 'cc/contexts/dashboard/myAccountContext.xml'
        });
    }
);