<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wiki extends Model
{

    protected $fillable = ['wiki_id','user_id','title','visibility','IP_address'];

    public function game() {
        return $this->belongsTo('App\Game');
    }
    
}
