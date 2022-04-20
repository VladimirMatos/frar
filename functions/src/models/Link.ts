"use strict";
import { DataTypes } from 'sequelize';
import { LinkAttributes } from '../interfaces/link';
import db from '../config/connectionSequelize';

const Link = db.define<LinkAttributes>('Link', 
  {
    Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    URL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
}, { tableName: 'Link', timestamps: false });

export { Link }
