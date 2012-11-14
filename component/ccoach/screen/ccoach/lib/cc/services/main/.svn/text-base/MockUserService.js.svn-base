// cc/services/main/MockUserService;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to create mock of users to sign in on the site
 */
define(
    [
        'dojo/_base/lang',
        'dojo/store/Memory'
    ],
    function (lang, Memory) {

        // Generate mock employee data
        var data = (function () {
            var logins = ['Matthew', 'User', 'Catalina', 'Login2', 'Login3', 'Login4', 'Login5', 'Login6', 'Login7', 'Login8', 'Login9', 'Login10'],
                passwords = ['matthew', 'pass', 'catalina', 'login2', 'login3', 'login4', 'login5', 'login6', 'login7', 'login8', 'login9', 'login10'],
                names = ['Matthew', 'Clara', 'Catalina', 'Name2', 'Name3', 'Name4', 'Name5', 'Name6', 'Name7', 'Name8', 'Name9', 'Name10'],
                lastNamess = ['Hopkins', 'Lago', 'Ponor', 'LastName2', 'LastName3', 'LastName4', 'LastName5', 'LastName6', 'LastName7', 'LastName8', 'LastName9', 'LastName10'],
                roles = ['AGENT', 'CLERK', 'OWNER', 'AGENT', 'CLERK', 'OWNER', 'AGENT', 'CLERK', 'OWNER', 'AGENT', 'CLERK', 'OWNER'],
                data = [],
                id = 0,

                getLogin = function(ind){
                    return logins[ind-1];
                },

                getPassword = function(ind){
                    return passwords[ind-1];
                },

                getName = function(ind){
                    return names[ind-1];
                },

                getLastName = function(ind){
                    return lastNamess[ind-1];
                },

                getRole = function(ind){
                    return roles[ind-1];
                };

            for(var i = 0; i <= 10; i++){
                data.push({
                    id:++id,
                    login:getLogin(id),
                    password:getPassword(id),
                    firstName: getName(id),
                    lastName: getLastName(id),
                    role: getRole(id),
                    partyId: getLogin(id) == 'User' ? 'TestAgent': 'AnotherAgent',
                    signInTime: undefined
                });
            }

            return data;
        })();

        var store = new Memory({data:data});

        function MockUserService() {
        }

        //noinspection JSUnusedGlobalSymbols
        MockUserService.prototype = {

            getByLoginPassword:function (loginVal, passwordVal) {
                var res = store.query({login: loginVal, password: passwordVal});
                return res[0];
            },

            getById: function(id){
                return store.get(id);
            },

            put:function (object) {
                return store.put(object);
            },

            remove:function (id) {
                return store.remove(id);
            },

            query:function (query) {
                return store.query(query);
            }
        };

        //noinspection JSUnresolvedFunction
        lang.setObject('cc.services.main.MockUserService', MockUserService);

        return MockUserService;
    }
);