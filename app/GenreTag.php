<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class GenreTag extends Model
{
    protected $fillable = ['game_id','article_id','genre'];

    public function game() {
        return $this->belongsTo('App\Game');
    }
}
