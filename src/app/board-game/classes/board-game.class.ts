import { BGCategory } from '../../bg-category/classes/bg-category.class';

export class BoardGame {
  id?: string;
  title: string;
  introduction: string;
  description: string;
  coverArtImage?: string;
  minPlayers: number;
  maxPlayers: number;
  averageLength: number;
  minAge: number;
  unitsAvaliable: number;
  categories?: BGCategory[];

  constructor() {
    this.id = undefined;
    this.title = '';
    this.introduction = '';
    this.description = '';
    this.coverArtImage = undefined;
    this.minPlayers = 1;
    this.maxPlayers = 1;
    this.averageLength = 1;
    this.minAge = 3;
    this.unitsAvaliable = 1;
    this.categories = [];
  }
}
