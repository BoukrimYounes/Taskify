<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashbordController extends Controller
{

    public function index()
    {
        $user = Auth::user();
    
        // Tasks created by the user
        $myTasks = $user->tasks()
            ->with(['creator', 'assignedMembers'])
            ->orderBy('created_at', 'desc')
            ->get();
        
        // Tasks assigned to the user (excluding those they created)
        $assignedTasks = $user->assignedTasks()
        ->with(['creator', 'assignedMembers'])
        ->orderBy('created_at', 'desc')
        ->get();
    
        return Inertia::render('Home', [
            'myTasks' => $myTasks,
            'assignedTasks' => $assignedTasks,
            'users' => User::all(),
        ]);
    }
}
