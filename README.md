Create a DB:
CREATE DATABASE aadhar;

Create table:
CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL,
  `task` varchar(200) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
);
 
ALTER TABLE `tasks` ADD PRIMARY KEY (`id`);
ALTER TABLE `tasks` MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
Populate the table with sample data:

INSERT INTO `tasks` (`id`, `task`, `status`, `created_at`) VALUES
(1, 'Find bugs', 1, '2016-04-10 23:50:40'),
(2, 'Review code', 1, '2016-04-10 23:50:40'),
(3, 'Fix bugs', 1, '2016-04-10 23:50:40'),
(4, 'Refactor Code', 1, '2016-04-10 23:50:40'),
(5, 'Push to prod', 1, '2016-04-10 23:50:50');


Run Express
node server.js


1) List Customers - Get Method :
http://localhost:3000/customer/customers

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

2) Create Customer - POST method :

http://localhost:3000/customer/customers

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


3) Edit Customer - PUT Method :

http://localhost:3000/customer/customer/3

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


4) Get specific customer - GET method :
http://localhost:3000/customer/customer/3


5) Delete Specific Customer - DELETE Method :
http://localhost:3000/customer/customer/3




