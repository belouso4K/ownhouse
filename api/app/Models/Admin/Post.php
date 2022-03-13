<?php

namespace App\Models\Admin;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'title',
        'slud',
        'desc',
        'status',
        'excerpt',
        'file',
        'status',
        'tags',
        'created_at',
    ];

    public function tags() {
        return $this->belongsToMany(Tag::class)->withTimestamps();
    }
}
