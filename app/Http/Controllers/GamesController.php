<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;

class GamesController extends Controller
{
    public function index() {
        return Game::orderBy('title','asc')->get();
    }
    public function store(Request $request) {
        $data = json_decode($request->getcontent(),true); //Gets data from front end request
        $title = htmlspecialchars($data[0]);
        $description = htmlspecialchars($data[1]);
        
        //If the first digit is numeric sets first letter to 0-9 with rest of numbers
        if(is_numeric($title[0])) {
            $firstletter = '0-9';
        } else {
            $firstletter = $title[0];
        }
        $user_id = 0;
        if($data[2] !== null) {
            $user_id = $data[2];
        } else {
            $user_id = 0;
        }

        //Stores game data
        $game = new Game;
        $game->firstletter = $firstletter;
        $game->url = str_replace(' ', '_', $title);
        $game->title = $title;
        $game->description = $description;
        $game->user_id = $user_id;
        $game->IP_address = $this->getClientIP();
        $game->save();

        $consoles = $data[3];  //Gets which consoles the game is available for
        $this->storeConsoles($game,$consoles);

        $genres = $data[4];
        $this->storeGenres($game,$genres);
        return Game::all(); 
    }
    //Stores Console Tags
    public function storeConsoles($game,$consoles) {
        foreach($consoles as $console) {
            $consoleTag = Game::find($game->id);
            $consoleTag->consoleTag()->create([
                'game_id' => $game->id,
                'article_id' => 0,
                'console' => $console,
            ]);
        }
    }
    //Stores Genre Tags
    public function storeGenres($game,$genres) {
        foreach($genres as $genre) {
            $genreTag = Game::find($game->id);
            $genreTag->genreTag()->create([
                'game_id' => $game->id,
                'article_id' => 0,
                'genre' => $genre,
            ]);
        }
    }
    /**
     * Show page is used in connection with 
     * views/games/show.blade.php
     * js/game/Game.js
     *  */
    public function show($game_url) {
        $game = Game::where('url', '=', $game_url)->first();
        $data = [];
        if($game) {
            $wiki = $game->wiki()->get();
            $data = [$game,$wiki];
            return $data;
        } else {
            return 'false';
        }
    }
    /**
     * 
     */
    public function paginate($letter) {
        if($letter == 'All') {
            return Game::orderBy('title', 'asc')->get();
        } else {
            return Game::select('id', 'title','firstletter','url')->where('firstletter', '=', $letter)->orderBy('title', 'asc')->get();
        }
    }
}
