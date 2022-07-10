import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { last, Subscription } from 'rxjs';
import { Account } from '../shared/models/account.model';
import { AccountService } from './account.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit, OnDestroy{
  // account info
  public name = null;
  public username = null;
  public email = null;
  public birthdate = null;
  public gender = null;
  public country = null;
  public city = null;
  public region = null;
  public image = null;
  public storageKey = "eco2app-avatar"

  // subscription
  private sub: Subscription;

  // birthdate reference
  @ViewChild("birthdateRef") birthdateRef: ElementRef;

  // which field is being editted
  public fieldEdited = "";

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    // load account data to the component to display
    this.sub= this.accountService.userAccount.subscribe((value)=>
    {
      const account = value;
      this.name = account.first_name + " " + account.last_name;
      this.username = account.username;
      this.email = account.email;
      this.birthdate = account.birthdate;
      this.gender = account.gender;
      this.country = account.country;
      this.city = account.city;
      this.region = account.region;
    });

    // load the image if any
    this.image = localStorage.getItem(this.storageKey);
  }

  onChangeMode(field: string){
    // switch from non edit mode to edit mode
    if (!this.fieldEdited){
      this.fieldEdited = field;

      const placeholder = '--- Edit Here ---';

      switch (this.fieldEdited){
        case 'name':
          if (!this.name) this.name = placeholder; break;

        case 'email':
          if (!this.email) this.email = placeholder; break;

        case 'username':
          this.username= placeholder; break;

        case 'gender':
          if (!this.gender) this.gender = placeholder; break;

        case 'country':
          if (!this.country) this.country = placeholder; break;

        case 'city':
          if (!this.city) this.city = placeholder; break;

        case 'region':
          if (!this.region) this.region = placeholder; break;
      }
    }
    else
    {
      if (this.fieldEdited=='birthdate') this.birthdate = this.birthdateRef.nativeElement.value;
      this.fieldEdited = '';
    }
  }

  ngOnDestroy(): void {
    // save updated data to the database
    const nameParts = this.name.split(" ");
    let firstName = "";
    let lastName = "";

    switch (nameParts.length)
    {
      case 0:
        break;
      case 1:
        lastName = nameParts[0]; break;
      default:
        firstName = nameParts.slice(0, nameParts.length-1).join(" ");
        lastName = nameParts[nameParts.length-1]
        break;
    }

    this.accountService.saveUserAccountToDb(
      new Account(this.username,
                  this.email,
                  firstName,
                  lastName,
                  this.birthdate,
                  this.gender,
                  this.country,
                  this.city,
                  this.region)
    );
    // save img to local storage
    localStorage.removeItem(this.storageKey);
    console.log(this.image)
    localStorage.setItem(this.storageKey, this.image)

    // unsubscribe the subscription
    this.sub.unsubscribe();
  }

  async onChangeImageInput(event)
  {
    console.log(event.target.files[0])

    // retrieve from input:img element
    const selectedFile = event.target.files[0];

    // create a file reader
    var reader = new FileReader();
    let image = null;

    // read the file
    reader.readAsDataURL(selectedFile);

    // set onload
    reader.onload = (_event) => {
      this.image = reader.result;
    }
  }
}
