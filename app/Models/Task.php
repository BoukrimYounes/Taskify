<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $guarded = [];
    protected $casts = [
        'assigned_members' => 'array',
    ];

    public function creator()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    /**
     * Get all assigned users (via JSON array)
     */

     public function assignedMembers()
     {
         return $this->belongsToMany(User::class);
     }
     
}
