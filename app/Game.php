<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    public function wiki() {
        return $this->hasMany('App\Wiki');
    }
    public function consoleTag() {
        return $this->hasMany('App\ConsoleTag');
    }
    public function genreTag() {
        return $this->hasMany('App\GenreTag');
    }
}
