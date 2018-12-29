<?php

use Faker\Generator as Faker;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(App\News::class, function (Faker $faker) {
    $title = $faker->name;
    return [
        'title' => $title,
        'description' => $faker->realText(300),
        'url' => str_replace(' ', '_', $title),
        'firstletter' => $title[0],
        'user_id' => 1,
        'visibility' => 0,
        'IP_address' => '127.0.0.1',
        'body' => $faker->text(),
    ];
});