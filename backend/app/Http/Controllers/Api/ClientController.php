<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientEditResource;
use App\Http\Resources\ClientResource;
use App\Models\User;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ClientController extends Controller
{
    // List clients created by logged-in admin
    public function index()
    {
        $clients = Auth::user()->clients()->with('interests')->paginate(10);

        return ClientResource::collection($clients);
    }

    // Create client
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required',
            'last_name'  => 'required',
            'email'      => 'required|email|unique:users',
            'password'   => 'nullable|min:6',
            'interests'  => 'required|array',
            'contact_no' => 'nullable|unique:users'  
        ]);

        $clientRole = Role::where('name', 'Client')->first();

        $password = $request->password ?? "Pass@123";
        $client = User::create([
            'first_name' => $request->first_name,
            'last_name'  => $request->last_name,
            'email'      => $request->email,
            'password'   => Hash::make($password),
            'contact_no' => $request->contact_no,
            'birthday'   => $request->birthday,
            'role_id'    => $clientRole->id,
            'created_by' => Auth::id(),
        ]);

        if ($request->has('interests')) {
            $client->interests()->sync($request->interests);
        }

        return response()->json($client, 201);
    }

    // Show single client (for edit)
    public function show($id)
    {
       $client = Auth::user()
            ->clients()
            ->with('interests')
            ->findOrFail($id);

        return new ClientEditResource($client);
    }


    // Update client
    public function update(Request $request, $id)
    {
        $client = Auth::user()->clients()->findOrFail($id);

        $client->update($request->only([
            'first_name',
            'last_name',
            'contact_no',
            'birthday'
        ]));

        if ($request->has('interests')) {
            $client->interests()->sync($request->interests);
        }

        return response()->json($client);
    }

    // Delete client
    public function destroy($id)
    {
        $client = Auth::user()->clients()->findOrFail($id);
        $client->delete();

        return response()->json(['message' => 'Client deleted']);
    }
}
