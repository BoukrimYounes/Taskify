<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Implement if needed
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'status' => ['required', Rule::in(['To-Do', 'In-Progress', 'Completed'])],
            'type' => ['required', Rule::in(['Feature', 'Bug', 'Base'])], // Example types
            'deadline' => 'required|date|after_or_equal:today',
            'assigned_members' => 'required|array|min:1',
            'assigned_members.*' => 'exists:users,id'
        ]);

        try {
            $task = Auth::user()->tasks()->create([
                'title' => $validated['title'],
                'description' => $validated['description'],
                'status' => $validated['status'],
                'type' => $validated['type'],
                'deadline' => $validated['deadline'],
                // user_id is automatically set by Auth::user()->tasks()
            ]);

            // Sync assigned members (this handles both attach and detach)
            $task->assignedMembers()->sync($validated['assigned_members']);

            return redirect()->back()->with([
                'success' => 'Task created successfully!',
                'task' => $task // Optional: pass the created task if needed
            ]);

        } catch (\Exception $e) {
            return redirect()->back()
                ->withErrors(['error' => 'Failed to create task: ' . $e->getMessage()])
                ->withInput();
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {


        $validated = $request->validate([
            'status' => ['required', Rule::in(['To-Do', 'In-Progress', 'Completed'])],
            // Add other fields if needed
        ]);

        try {
            $task->update($validated);
            
            return back()->with([
                'success' => 'Task updated successfully!',
                'task' => $task->fresh() // Return refreshed model
            ]);

        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to update task: ' . $e->getMessage()
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {

        try {
            $task->delete();
            return back()->with('success', 'Task deleted successfully!');
            
        } catch (\Exception $e) {
            return back()->withErrors([
                'error' => 'Failed to delete task: ' . $e->getMessage()
            ]);
        }
    }
}