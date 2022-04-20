import { Model } from 'sequelize';

export interface LinkAttributes extends Model  {
	Id: string;
	URL: string;
  }
