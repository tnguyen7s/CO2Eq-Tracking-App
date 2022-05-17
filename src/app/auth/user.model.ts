export class User{
  public email: string;
  public userId: string;
  private _token: string;
  private _tokenExpirationDate: Date;

  constructor(email: string, userId:string, token:string, tokenExpirationDate: Date)
  {
    this.email = email;
    this.userId = userId;
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
}
