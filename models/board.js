const Sequelize = require('sequelize');

module.exports = class Board extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title:{
                type: Sequelize.STRING(100),
                allowNull: false
            },
            content:{
                type: Sequelize.TEXT,
                allowNull: false
            },
            date:{
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            hit:{
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:'Board',
            tableName:'board',
            charset:'utf8',
            collate:'utf8_general_ci'
        });
    };
};
