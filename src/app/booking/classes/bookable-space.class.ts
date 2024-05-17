export type BookableSpaceStatus = 'seleccionado' | 'ocupado' | 'libre';

export class BookableSpace {
  id?: string;
  spaceNumber: number;
  left: number;
  top: number;
  size: number;
  capacity: number;
  status: BookableSpaceStatus;

  constructor() {
    this.id = undefined;
    this.spaceNumber = 0;
    this.left = 0;
    this.top = 0;
    this.size = 0;
    this.capacity = 0;
    this.status = 'libre';
  }
}
