<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConsoleTag extends Model
{
    protected $fillable = ['game_id','article_id','console'];

    public function game() {
        return $this->belongsTo('App\Game');
    }
}
