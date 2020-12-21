Database : aadhar

CREATE TABLE users (
user_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
user_name VARCHAR(100) NOT NULL,
user_email VARCHAR(150) NOT NULL,
user_password VARCHAR(20) NOT NULL,
user_type VARCHAR(20) NOT NULL,
user_status TINYINT(1),
created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO users(user_name,user_email,user_password,user_type,user_status)
VALUES('vivek','vickygoelk@gmail.com','test123123','admin',1);

UPDATE users SET user_password='test123456' where user_id =1;

CREATE TABLE customers (
customer_id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
customer_uid VARCHAR(100) NOT NULL,
customer_name VARCHAR(100) NOT NULL,
customer_phone VARCHAR(15) NOT NULL,
customer_martial VARCHAR(20) NOT NULL,
customer_address VARCHAR(255) NOT NULL,
customer_gender ENUM('Male','Female','Transgender'),
customer_dob DATE NOT NULL,
customer_district VARCHAR(100),
customer_state VARCHAR(100),
customer_pincode INT(10),
created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
updated_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO customers(customer_uid,customer_name,customer_phone,customer_martial,customer_address,customer_gender,customer_dob,customer_district,customer_state,customer_pincode)
VALUES('2190 4656 5680','vinithkumar','8884366688','married','a 006 - 4th A cross -kaggadasapura','Male','1983-10-23','bangalore','karnataka','560093');

UPDATE customers SET customer_dob='1983-10-23' where customer_id =1;

Run Express
node server.js

1. List Customers - Get Method :
   http://localhost:3000/customer/listing

[
{
"customer_id": 1,
"customer_uid": "2190 4656 5680",
"customer_name": "vinithkumar",
"customer_phone": "8884366688",
"customer_martial": "married",
"customer_address": "a 006 - 4th A cross -kaggadasapura",
"customer_gender": "Male",
"customer_dob": "1983-10-22T18:30:00.000Z",
"customer_district": "bangalore",
"customer_state": "karnataka",
"customer_pincode": 560093,
"created_date": "2020-12-18T11:02:58.000Z",
"updated_date": "2020-12-18T11:04:24.000Z"
},
{
"customer_id": 2,
"customer_uid": "2319 3945 3845",
"customer_name": "john",
"customer_phone": "7740534522",
"customer_martial": "single",
"customer_address": "444 fhfweaf adsfafadf sdagfdsagg",
"customer_gender": "Male",
"customer_dob": "1992-04-22T18:30:00.000Z",
"customer_district": "Mumbai",
"customer_state": "mahastra",
"customer_pincode": 693923,
"created_date": "2020-12-18T12:57:54.000Z",
"updated_date": "2020-12-18T12:57:54.000Z"
},
{
"customer_id": 4,
"customer_uid": "8903 3945 3845",
"customer_name": "Thomas",
"customer_phone": "9838482834",
"customer_martial": "married",
"customer_address": "000 fhfweaf adsfafadf sdagfdsagg",
"customer_gender": "Male",
"customer_dob": "1980-04-22T18:30:00.000Z",
"customer_district": "Mumbai",
"customer_state": "mahastra",
"customer_pincode": 693923,
"created_date": "2020-12-18T13:24:47.000Z",
"updated_date": "2020-12-18T13:24:47.000Z"
}
]

2. Create Customer - POST method :

http://localhost:3000/customer/create

Input :
{
"uid":"5555 3945 3845",
"name":"Alexa",
"phone":"8387473883",
"martial":"married",
"address":"8949 fhfweaf adsfafadf sdagfdsagg",
"gender":"Female",
"dob":"2001-04-23",
"district":"Mumbai",
"state":"mahastra",
"pincode":"693923"
}

Output :
Customer ID

3. Edit Customer - PUT Method :

http://localhost:3000/customer/update/3

Input :
{
"uid":"5555 3945 5010",
"name":"Alexa",
"phone":"9937473883",
"martial":"married",
"address":"8949 fhfweaf adsfafadf sdagfdsagg",
"gender":"Female",
"dob":"2001-04-23",
"district":"Mumbai",
"state":"mahastra",
"pincode":"693923"
}

4. Get specific customer - GET method :
   http://localhost:3000/customer/get_details/3

5. Delete Specific Customer - DELETE Method :
   http://localhost:3000/customer/delete/3

6.http://localhost:3000/user/validate

{
"login":"vivek",
"password":"test123456"
}
