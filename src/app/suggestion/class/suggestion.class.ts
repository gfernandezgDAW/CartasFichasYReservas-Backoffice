import { User } from '../../user/classes/user.class';

export type SuggestionStatusType = 'Creada' | 'Aceptada' | 'Denegada';

export class Suggestion {
  title: string;
  description: string;
  status: SuggestionStatusType;
  user?: User;
  createdAt?: Date;

  constructor() {
    this.title = '';
    this.description = '';
    this.status = 'Creada';
    this.user = undefined;
    this.createdAt = undefined;
  }
}
