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



http://localhost:3000/tasks

[{"id":1,"task":"Find bugs","status":1,"created_at":"2016-04-10T18:20:40.000Z"},
{"id":2,"task":"Review code","status":1,"created_at":"2016-04-10T18:20:40.000Z"},
{"id":3,"task":"Fix bugs","status":1,"created_at":"2016-04-10T18:20:40.000Z"},
{"id":4,"task":"Refactor Code","status":1,"created_at":"2016-04-10T18:20:40.000Z"},
{"id":5,"task":"Push to prod","status":1,"created_at":"2016-04-10T18:20:50.000Z"}]
