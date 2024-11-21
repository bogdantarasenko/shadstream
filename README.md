
# Laravel + JetStream + React + Shadcn/ui + InertiaJS Starter Template
![Laravel + JetStream + React + Shadcn/ui + InertiaJS Starter Template](https://github.com/user-attachments/assets/fc4f6f82-b9e2-4da6-a8f3-7202244bac07)

This is a SaaS template to start building a your saas with multitenancy quickly.
Feel free to customize this template to fit the specific needs of your Laravel application!

## Technologies

- [Laravel 11](https://laravel.com/docs/)
- [JetStream](https://jetstream.laravel.com)
- [Shadcn/ui](https://ui.shadcn.com/docs)
- [InertiaJS](https://inertiajs.com/)
- [React](https://react.dev/)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- PHP >= 8.2
- Composer (for package management)
- Node.js & npm (for frontend dependencies)
- MySQL or another [compatible database](https://laravel.com/docs/11.x/database#configuration)

## Installation

1. Clone the repository: `git clone https://github.com/bogdantarasenko/shadstream.git`
2. Navigate into the project directory: `cd [project directory]`
3. Install PHP dependencies: `composer install`
4. Copy `.env.example` to `.env` and configure your environment variables, including database settings and application key.
5. Generate application key: `php artisan key:generate`
6. Run database migrations: `php artisan migrate`
7. Optionally, seed the database: `php artisan db:seed`
8. Install frontend dependencies: `npm install && npm run dev` (for development) or `npm install && npm run build` (for production)

## Usage

To start the development server, run:

```
php artisan serve
```

Access the application in your browser at `http://localhost:8000` by default.

## Contact

If you have any questions, feedback, or support requests, you can reach me here [bogdantarasenkozp@gmail.com](bogdantarasenkozp@gmail.com)
