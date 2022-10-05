export abstract class GenericRepository<T> {
  abstract get(id: string): Promise<T>;
  abstract filter(data: object): Promise<T[]>;
}
