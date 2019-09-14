export class Tracker {
  constructor(public id: string) {}
  static create(id: string, options: any): Tracker {
    return new Tracker(id);
  }
}
