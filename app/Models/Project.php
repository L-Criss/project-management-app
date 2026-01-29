<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Project extends Model
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'projects';

    protected $fillable = [
        'name',
        'description',
        'image_path',
        'due_date',
        'status',
        'created_by',
        'updated_by',
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy()
    {
        return $this->belongsTo(User::class, 'updated_by');
    }
}
