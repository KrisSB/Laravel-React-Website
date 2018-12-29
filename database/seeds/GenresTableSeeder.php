<?php

use Illuminate\Database\Seeder;

class GenresTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('genres')->insert([
            'title' => 'Action',
            'ref_title' => 'action',
            'description' => 'Games based on hand-eye coordination and reflexes.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Adventure',
            'ref_title' => 'adventure',
            'description' => 'Games that don\'t base their gameplay on hand-eye coordination and reflexes.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Fighter',
            'ref_title' => 'fighter',
            'description' => 'Games that are based on close range combat.'
        ]);

        DB::table('genres')->insert([
            'title' => 'MMO',
            'ref_title' => 'MMO',
            'description' => 'Games that allow large crowds of players to play their game simultaneously in one world.'
        ]);

        DB::table('genres')->insert([
            'title' => 'RPG',
            'ref_title' => 'rpg',
            'description' => 'Games that involve putting the player into the role of game character.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Shooter',
            'ref_title' => 'shooter',
            'description' => 'Games that involve using weapons such as guns or bows as their main form of combat.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Simulation',
            'ref_title' => 'simulation',
            'description' => 'Games that simulate reality.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Survival',
            'ref_title' => 'survival',
            'description' => 'Games that start the player out with usually a small amount of resources and have the player try and survive.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Strategy',
            'ref_title' => 'strategy',
            'description' => 'Games that require careful and thoughtful planning to play and complete.'
        ]);

        DB::table('genres')->insert([
            'title' => 'Sports',
            'ref_title' => 'sports',
            'description' => 'Games that simulate sports.'
        ]);
    }
}
