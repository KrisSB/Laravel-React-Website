<?php

use Illuminate\Database\Seeder;

class ConsolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('consoles')->insert([
            'title' => 'PS4',
            'ref_title' => 'ps4',
            'description' => 'Console made by Sony, released November of 2013.'
        ]);

        DB::table('consoles')->insert([
            'title' => 'Xbox One',
            'ref_title' => 'xboxone',
            'description' => 'Console made by Microsoft, released November of 2013.'
        ]);

        DB::table('consoles')->insert([
            'title' => 'Switch',
            'ref_title' => 'switch',
            'description' => 'Console made by Nintendo, released March of 2017.'
        ]);

        DB::table('consoles')->insert([
            'title' => 'PC',
            'ref_title' => 'pc',
            'description' => 'Personal Computer'
        ]);

    }
}
