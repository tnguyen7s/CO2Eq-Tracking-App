export class User{
  public userId: number;
  public username: string;
  public email: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(userId:number, username: string, email: string, token:string, tokenExpirationDate: Date)
  {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this._token = token;
    this._tokenExpirationDate = tokenExpirationDate;
  }

  get token(){
    if (this._tokenExpirationDate && this._tokenExpirationDate >  new Date())
    {
      return this._token;
    }

    return null;
  }

  get tokenExpirationDate()
  {
    return this._tokenExpirationDate
  }
}
