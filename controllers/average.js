module.exports = function(app){

    var log = app.utils.log,
        responseView = require('../views/jsonSuccessResponse');

    return {

        /**
        * Retrieves an average for an specific period of time (identified by
        * id) for all knowledge areas institution has evaluated, for all
        * institutions where evaluee is active.
        **/
        retrieveByPeriod: function(req, res, next){

            responseView(
                {
                    institutions: [
                    {
                        id: 2,
                        name: "Universidad Nacional de Colombia",
                        address: "Calle 45 # 30, Bogotá, Colombia",
                        knowledgeAreas: [
                        {
                            id: 1,
                            areaName: "Matemáticas",
                            average: 3.94
                        },
                        {
                            id: 4,
                            areaName: "Ciencias Naturales",
                            average: 4.60
                        },
                        {
                            id: 6,
                            areaName: "Ciencias Sociales",
                            average: 3.80
                        }
                        ]
                    }
                    ]
                },
                res
            );

        },

        /**
        * Retrieves an average for an specific institution (identified by
        * id) in active period for all knowledge areas institution has
        * evaluated.
        **/
        retrieveByInstitution: function(req, res, next){

            responseView(
                {
                    id: 2,
                    name: "Universidad Nacional de Colombia",
                    address: "Calle 45 # 30, Bogotá, Colombia",
                    knowledgeAreas: [
                    {
                        id: 1,
                        areaName: "Matemáticas",
                        average: 3.94
                    },
                    {
                        id: 4,
                        areaName: "Ciencias Naturales",
                        average: 4.60
                    },
                    {
                        id: 6,
                        areaName: "Ciencias Sociales",
                        average: 3.80
                    }
                    ]
                },
                res
            );

        },

        /**
        * Retrieves an average for an specific knowledge area (identified by
        * id) in active period for all institutions where evaluee is active.
        **/
        retrieveByKnowledgeArea: function(req, res, next){

            responseView(
                {
                    id: 1,
                    areaName: "Matemáticas",
                    institutions: [
                    {
                        id: 2,
                        name: "Universidad Nacional de Colombia",
                        address: "Calle 45 # 30, Bogotá, Colombia",
                        average: 3.94
                    }
                    ],
                    average: 3.94
                },
                res
            );

        },



    }

}
