import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import User from "./User.js";

const Survey = sequelize.define("Survey", {
  answers: { type: DataTypes.JSON, allowNull: false },
});

// Relation
User.hasMany(Survey, { foreignKey: "userId" });
Survey.belongsTo(User, { foreignKey: "userId" });

export default Survey;
