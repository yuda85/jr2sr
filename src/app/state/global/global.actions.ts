export class SetJobs {
  static readonly type = '[Global] Set Jobs';
  constructor(public payload: any) {}
}

export class AddJobs {
  static readonly type = '[Global] Add Jobs';
  constructor(public payload: any) {}
}
