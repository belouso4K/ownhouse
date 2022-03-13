<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Cviebrock\EloquentSluggable\Sluggable;

class Post extends Model
{
    use SoftDeletes, HasFactory;

    public $timestamps = false;
    protected $table = 'posts';


//    public function addedBy()
//    {
//        return $this->hasOne('App\Models\User', 'id',
//            'added_by');
//    }

//
//    public function getRouteKeyName()
//    {
//        return 'slug';
//    }


}
