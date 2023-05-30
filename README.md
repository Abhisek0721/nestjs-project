# Basic API created using NestJS

This is a simple authenticator API created using NestJS.

## How to Run ?

To run this api:
Step-1
```
npm install
```
Step-2
```
npm run start
```

## API Documentation

The project provides the following API endpoints:

### `POST /api/user`

create a new user.

**Request:**

```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "new user added!"
}
```

### `GET /api/user/:userId`

get user's data.

**Request:**

`GET /api/user/644eae258032765ade4101f7`

**Response:**
```json
{
  "_id": "644eae258032765ade4101f7",
  "name": "Abhisek Updhaya",
  "email": "abhisek0721@gmail.com",
  "verify": false,
  "password": "U2FsdGVkX1+LAXzJx3chbfofpx0IJeZ3HJOofT39EWU=",
  "__v": 0
}
```

### `GET /api/user/:userId/avatar`

get user's avatar.

**Request:**

`GET /api/user/644eae258032765ade4101f7/avatar`

**Response:**
```json
Data in Base64
```

### `DELETE /api/user/:userId/avatar`

delete user's avatar.

**Request:**

`DELETE /api/user/644eae258032765ade4101f7/avatar`

**Response:**
```json
{
  "success": true,
  "message": "avatar is deleted!"
}
```

## Contact Information

`Name: Abhisekh Upadhaya`
`Email: Abhisek0721@gmail.com`
