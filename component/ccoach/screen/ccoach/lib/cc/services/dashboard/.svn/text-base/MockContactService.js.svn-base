// cc/services/dashboard/MockContactService;
//noinspection JSUnresolvedFunction
/**
 * @fileOverview file to mock contacts
 */
define(
    [
        'dojo/_base/lang',
        'dojo/store/Memory'
    ],
    function (lang, Memory) {

        // Generate mock employee data
        var data = (function () {
            var userIds = ['1', '1', '1',
                '2', '2', '2', '2', '2', '2', '2',
                '3', '3',
                '4', '4', '4', '4',
                '5',
                '6', '6',
                '7', '7', '7', '7', '7',
                '8', '8', '8',
                '9',
                '10', '10',
                '11', '11', '11', '11', '11',
                '12', '12', '12'],

                names = ['Trinity', 'Agustin', 'Marquetta', 'Nicol', 'Norris', 'Cherilyn', 'Meaghan', 'Kacie',
                    'Cinthia', 'Kimbery', 'Gisele', 'Sonia', 'Nelson', 'Usha', 'Casey', 'Elvira', 'Sharon', 'Latoya',
                    'Lashawn', 'Florine', 'Cherry', 'Cathern', 'Mechelle', 'Kira', 'Haley', 'Elfreda', 'Elmo', 'Cindy',
                    'Kristopher', 'Lane', 'Marhta', 'Flavia', 'Patrick', 'Lane', 'Rosamaria', 'Tiana', 'Janeth',
                    'Francie'],

                lastNames = ['Doepke', 'Kollman', 'Nguyen', 'Rutz', 'Foucher', 'Waymire', 'Stancil', 'Lucca', 'Linley',
                    'Shomo', 'Yetman', 'Mitzel', 'Rafferty', 'Condie', 'Curley', 'Osterberg', 'Sarinana', 'Kellman',
                    'Vosburg', 'Triggs', 'Byram', 'Fricks', 'Chica', 'Clowers', 'Stansbury', 'Oboyle', 'Calle',
                    'Selvey', 'Bliss', 'Woodell', 'Serpa', 'Burtt', 'Wadkins', 'Gulledge', 'Loyd', 'Ripley', 'Brookins',
                    'Isham'],

                domains = ['com', 'biz', 'org', 'ca', 'us', 'net', 'info', 'north.am', 'south.am'],

                addresses = ['1116 4th Street NW Albuquerque NM 87102', '400 S. Madison Amarillo TX 79101',
                    '355 E 76th Ave Suite 102 Anchorage AK 99518', '15855 Reid Rd Athens AL 35611',
                    '247 Camilla Drive Augusta GA 30907', '8006 Cameron Rd Ste M Austin TX 78754',
                    '3051B Washington Blvd Baltimore MD 21230', '6238 Fieldstone Drive Baton Rouge LA 70809',
                    '3820 Hollywood Drive Beaumont TX 77701', '3215 Montana Avenue Billings MT 59101',
                    '214 Distribution Drive Birmingham AL 35209', '368 Steelhead Way Boise ID 83704',
                    '670 East Travelers Trail Burnsville MN 55337', 'Mexicali Automotive Plant PO Box 2769 Calexico CA 92231',
                    '156 Spring St. Charleston WV 25301', '2701 Hutchinson-McDonald Road Suite F Charlotte NC 28269',
                    '3903 Volunteer Drive Suite 8 Chattanooga TN 37416', '2489 Walden Avenue Buffalo Cheektowaga NY 14225',
                    '2720 West Grand Avenue Chicago IL 60612', '1066-68 Marshall Avenue Cincinnati OH 45225',
                    '4-C Sunbelt Court Columbia South Carolina SC 29203', 'Unit 2 490 Bryant Street Denver CO 80204',
                    '10400 Hickman Des Moines IA 50325', 'Suite C-1 1477 Lomaland Dr El Paso TX 79935',
                    '275 Grimes Street Eugene OR 97402', '#101-10315 Airport Road Everett WA 98206',
                    '2611 Pickett Place, Unit 4 Fairbanks AK 99701', '12-1 Dubon Court Long Island Farmingdale NY 11735-1015',
                    'Suite C 2366 N. Steves Blvd Flagstaff AZ 86004', '2335 Laurens Circle Florence SC 29501',
                    '107 Forest Parkway Forest Park GA 30297', '308 Commerce Drive Fort Collins CO 80524',
                    '900 South Fresno St Fort Smith AR 72902', '7601 Pebble Drive, Bldg. #22 Fort Worth TX 76118',
                    '1191 North Fiesta Blvd, Suite #4 Gilbert AZ 85233', '510 Windy Point Drive Glendale Heights IL 60139'
                    ],

                activities = ['Buying', 'Selling'],

                data = [],
                id = 0,

                getRandomInt = function(from, to){
                    return Math.floor(Math.random() * (to - from + 1) + from);
                },

                getUserId = function(ind){
                    return userIds[ind-1];
                },

                getName = function(ind){
                    return names[ind-1];
                },

                getLastName = function(ind){
                    return lastNames[ind-1];
                },

                getPhoneNumber = function(){
                    return '+1-' + getRandomInt(0, 9) + getRandomInt(0, 9) + getRandomInt(0, 9) + '-' +
                        getRandomInt(0, 9) + getRandomInt(0, 9) + getRandomInt(0, 9) + getRandomInt(0, 9) + '-' +
                        getRandomInt(0, 9) + getRandomInt(0, 9) + getRandomInt(0, 9) + getRandomInt(0, 9);
                },

                getEmail = function(id){
                    return getName(id).toLowerCase() + '@' + getLastName(id).toLowerCase() + '.' + domains[getRandomInt(0, 8)]
                },

                getSkypeName = function(id){
                    return getName(id).toLowerCase() + '.' + getLastName(id).toLowerCase();
                },

                getAddress = function(ind){
                    return addresses[ind];
                };

            for (var i = 0; i <= 37; i++) {
                data.push({
                    id:++id,
                    userId: getUserId(id),
                    name: getName(id),
                    lastName: getLastName(id),
                    address: getAddress(id),
                    phoneNumber: getPhoneNumber(),
                    email: getEmail(id),
                    skype: getSkypeName(id),
                    offerActivity: activities[getRandomInt(0, 1)]
                });
            }

            return data;
        })();

        var store = new Memory({data:data});

        function MockContactService() {
        }

        MockContactService.prototype = {

            get:function (id) {
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
        lang.setObject('cc.services.dashboard.MockContactService', MockContactService);

        return MockContactService;
    }
);