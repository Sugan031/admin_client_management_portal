<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'contact_no',
        'birthday',
        'role_id',
        'created_by',
        'updated_by',
    ];

    protected $hidden = ['password'];

    // User belongs to a role
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    // Admin → Clients
    public function clients()
    {
        return $this->hasMany(User::class, 'created_by');
    }

    // Client → Interests
    public function interests()
    {
        return $this->belongsToMany(Interest::class, 'client_interest');
    }
}
