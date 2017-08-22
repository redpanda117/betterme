#API Documentation


##User Entity

###Entity service calls

####Create New User
Method Call: **POST** /user/create

**Parameters**
 - **email** : Valid email address
 - **DOB** : Date of birth in the format of "YYYY-MM-DD"
 - **fullName** : Full name of the user

Example code:
```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://abetterme.herokuapp.com/user/create",
  "method": "POST",
  "headers": {
    "content-type": "application/x-www-form-urlencoded"
  },
  "data": {
    "email": "Melissa.Renaut@gmail.com",
    "DOB": "2017-01-07",
    "fullName": "Melissa Renaut"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```
 

