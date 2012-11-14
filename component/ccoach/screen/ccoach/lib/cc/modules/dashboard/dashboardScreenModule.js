// cc/modules/dashboard/dashboardScreenModule;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Dashboard screen module
 */
define(
    [
        // requirements;
        'dojo/_base/declare',
        'cc/extensions/Module',

        // dependencies;
        'dijit/layout/TabContainer',
        'dijit/layout/BorderContainer',
        'dojo/store/Observable',
        'dojo/store/Cache',
        'dojo/store/Memory',
        'dojobiz/context/misc/ColumnGroup',
        'cc/modules/dashboard/presenters/PropertyPresenter',
        'cc/modules/dashboard/presenters/OfferPresenter',
        'dijit/layout/AccordionContainer',
        'dijit/form/CurrencyTextBox',
        'cc/services/dashboard/MockContactService',
        'dojox/grid/EnhancedGrid',
        'dojox/grid/enhanced/plugins/IndirectSelection',
        'dojox/grid/enhanced/plugins/Selector',
        'dojo/data/ObjectStore',
        'cc/modules/dashboard/renderers/EnhancedGridCellRenderer',
        'dijit/form/Select',
        'cc/modules/dashboard/utils/PorpertyMemoryStore'
    ],

    function(declare, Module){

        return declare('cc.modules.dashboard.dashboardScreenModule', Module, {

            context:'cc/flows/dashboard/dashboardFlow.xml'
        });
    }
);