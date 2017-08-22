# API Documentation


## User Entity

#### Create New User
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
    "email": "currentuser@gmail.com",
    "DOB": "2017-01-07",
    "fullName": "Amber Mercedes"
  }
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

#### Find all users
Method Call: **POST** /user/findall

**Parameters**
 - none

Example code:
```javascript
var settings = {
  "async": true,
  "crossDomain": true,
  "url": "http://localhost:3020/user/findall",
  "method": "GET",
  "headers": {}
}

$.ajax(settings).done(function (response) {
  console.log(response);
});
```

