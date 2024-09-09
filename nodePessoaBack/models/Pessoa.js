const { Model, DataTypes } = require("sequelize");

class Pessoa extends Model {}

module.exports = (sequelize) => {
    Pessoa.init(
        {
            Id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
              },
            Nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            CPF: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            Telefone: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: "Pessoa",
            tableName: "Pessoa",
            timestamps: false,
        }
    );
    return Pessoa;
}