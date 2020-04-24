<?php

namespace App\Http\Controllers;

use App\Client;
use App\Tas;
use App\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $tasks=Task::orderBy('created_at','DESC')->paginate(1000);
        return response()->json($tasks,200);
    }

    public function indext()
    {
        $tasks=Tas::orderBy('created_at','DESC')->paginate(1000);
        return response()->json($tasks,200);
    }




    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $task=Task::create($request->all());
        if($task){
            return $this->refresh();
         }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $task=Task::find($id);

        return response()->json($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $task=Task::find($id);
        $task->name=request('name');
        $task->save();
        if($task){
           return $this->refresh();
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $task=Task::find($id);
        if($task->delete()){
            return $this->refresh();
        }else{
            return response()->json(['error'=>'destroy method  has field.'],425);
        }
    }

    private function refresh()
    {
        $tasks=Task::orderBy('created_at','DESC')->paginate(1000);
        return response()->json($tasks,200);
    }
}
