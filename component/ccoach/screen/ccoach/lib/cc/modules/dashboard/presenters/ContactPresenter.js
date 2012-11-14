// cc/modules/dashboard/presenters/ContactPresenter;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview Contact controller(presenter) class
 */
define(
    [
        'dojo/_base/declare',
        'dijit/registry',
        'dijit/layout/ContentPane',
        'dojo/string',
        'dojo/text!/ccoach/lib/cc/modules/dashboard/view/contactDetails.html',
        'dojobiz/context/Container'
    ],

    function (declare, registry, ContentPane, str, template, Container) {

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.ContactPresenter
         * @static
         * @private
         * Constants that define contexts' IDs
         * Used to get object from contexts.
         */
        var CONTACTS_TAB_CONTAINER_ID = 'contactsTabContainer',
            CONTACT_SEARCH_BOX_ID = 'contactSearchText',
            CONTACT_FIELDS_DROPDOWN_ID = 'contactSearchFieldsDropDown',
            //CONTACT_GRID_ID = 'contactGrid',
            CONTACTS_CTX_ID = 'contactsContext',
            DASHBOARD_CTX_ID = 'dashboardContext',
            USER_INFO_BEAN_ID = 'userInfo',
            ADD_POPUP_ID = 'addContactPopup';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.ContactPresenter
         * @static
         * @private
         * Constants that define templates
         * Used for replacing values in string substitute
         */
        var PANE_TITLE_TMPL = 'Contact ${0}';

        //noinspection JSValidateJSDoc
        /**
         * @memberOf cc.modules.dashboard.presenters.ContactPresenter
         * @static
         * @private
         * Constants that define property name
         * Used to set object's property value
         */
        var SEARCH_ATTR = 'searchAttr';

        //noinspection JSUnusedGlobalSymbols
        return declare('cc.modules.dashboard.presenters.ContactPresenter', null, {

            contactsCtx:null,
            commonCtx:null,
            userInfo:null,

            constructor:function () {
                this.contactsCtx = Container.getContext(CONTACTS_CTX_ID);
                this.commonCtx = Container.getContext(DASHBOARD_CTX_ID);
                //noinspection JSUnresolvedFunction
                this.userInfo = this.commonCtx.provide(USER_INFO_BEAN_ID);
            },

            handleRowDblClick:function (target, event) {

                var contact = event.grid.getItem(event.rowIndex);
                //noinspection JSUnresolvedFunction
                var tabs = registry.byId(CONTACTS_TAB_CONTAINER_ID);
                //noinspection JSUnresolvedFunction
                var tabsCount = tabs.getChildren().length;

                //noinspection JSUnresolvedFunction
                var pane = new ContentPane({
                    title:str.substitute(PANE_TITLE_TMPL, [contact.id]),
                    closable:true,
                    content:str.substitute(template,
                        [
                            contact.id,
                            contact.userId,
                            contact.name,
                            contact.lastName,
                            contact.address,
                            contact.phoneNumber,
                            contact.email,
                            contact.skype,
                            contact.offerActivity
                        ]
                    )
                });

                //noinspection JSUnresolvedFunction
                tabs.addChild(pane, tabsCount + 1);
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                dojo.parser.parse(tabs.getChildren()[tabsCount]);
                //noinspection JSUnresolvedFunction
                tabs.selectChild(pane);
            },

            handleSearchFieldChange:function (target, value) {
                //noinspection JSUnresolvedFunction
                var searchText = registry.byId(CONTACT_SEARCH_BOX_ID);
                searchText.reset();
                searchText.set(SEARCH_ATTR, value);
            },

            handleSearchButtonClick:function () {
                //noinspection JSUnresolvedFunction
                var field = registry.byId(CONTACT_FIELDS_DROPDOWN_ID);
                //noinspection JSUnresolvedFunction
                var searchText = registry.byId(CONTACT_SEARCH_BOX_ID);
                //noinspection JSUnresolvedFunction
                //var contactGrid = registry.byId(CONTACT_GRID_ID);

                var queryObj = {
                    userId:this.userInfo.id
                };

                if (searchText.value != '') {
                    //noinspection JSUnresolvedVariable
                    queryObj[field.value] = searchText.displayedValue;
                }

                //noinspection JSUnresolvedFunction
                //contactGrid.setQuery(queryObj);
            },

            handleAddButtonClick: function(){
                //noinspection JSUnresolvedFunction
                var popup = this.contactsCtx.provide(ADD_POPUP_ID);
                popup.show();
            }
        });
    }
);
