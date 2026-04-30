<?php
/**
 * blueprint route definition for SKA HOST
 * File goes in routes/api-client.php via Blueprint inject
 */

use Illuminate\Support\Facades\Route;
use Pterodactyl\Http\Controllers\Api\Client\Servers\SkaHostController;

// Injecting into the /api/client/servers/{server}/skahost prefix
Route::group(['prefix' => '/api/client/servers/{server}/skahost'], function () {
    Route::get('/plugins/search', [SkaHostController::class, 'searchPlugins']);
    Route::post('/plugins/install', [SkaHostController::class, 'installPlugin']);
    
    Route::post('/bedrock/upload', [SkaHostController::class, 'uploadBedrockAddon']);
    
    Route::get('/players', [SkaHostController::class, 'getPlayers']);
    Route::post('/players/action', [SkaHostController::class, 'executePlayerAction']);
    
    Route::post('/version/change', [SkaHostController::class, 'changeVersion']);
});
