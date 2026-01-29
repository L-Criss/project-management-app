<?php

namespace App\Models;

use MongoDB\Laravel\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;


class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $connection = 'mongodb';
    protected $collection = 'users';

    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}

