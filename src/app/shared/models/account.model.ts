export class Account
{

  constructor(public username: string,
              public email: string,
              public first_name: string,
              public last_name: string,
              public birthdate: string,
              public gender: string,
              public country: string,
              public city: string,
              public region: string
              )
  {
    this.username = username;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.gender = gender;
    this.country = country;
    this.city = city;
    this.region = region;
  }

  public clone()
  {
    return new Account(this.username,
                      this.email,
                      this.first_name,
                      this.last_name,
                      this.birthdate,
                      this.gender,
                      this.country,
                      this.city,
                      this.region);
  }
}
