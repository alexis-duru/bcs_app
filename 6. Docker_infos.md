### Starting project
```bash
composer create-project symfony/skeleton .
composer require orm
composer require symfony/maker-bundle --dev
```
### Create database
```bash
php bin/console make:docker:database
```
### Change environement variable
```.env
DATABASE_URL="mysql://symfony:symfony@127.0.0.1:3306/symfony_docker"
```
### Show container
```bash
docker-compose up -d
docker-compose ps
```
### Make migration
```bash
php bin/console make:entity Post
php bin/console make:migration
php bin/console doctrine:migrations:migrate
```
### Enter into container
```bash
docker-compose exec database mysql -u symfony --password=symfony
SHOW DATABASES;
use symfony_docker;
show tables;
```
### Show variables symfony
```bash
php bin/console var:export --multiline
```

### Delete all container and images
```bash
docker-compose down
docker system prune -a
```