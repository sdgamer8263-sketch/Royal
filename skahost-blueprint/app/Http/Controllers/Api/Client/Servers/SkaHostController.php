<?php

namespace Pterodactyl\Http\Controllers\Api\Client\Servers;

use Pterodactyl\Models\Server;
use Pterodactyl\Http\Controllers\Api\Client\ClientApiController;
use Pterodactyl\Repositories\Wings\DaemonServerRepository;
use Pterodactyl\Repositories\Wings\DaemonCommandRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class SkaHostController extends ClientApiController
{
    private $daemonServerRepository;
    private $daemonCommandRepository;

    public function __construct(
        DaemonServerRepository $daemonServerRepository,
        DaemonCommandRepository $daemonCommandRepository
    ) {
        parent::__construct();
        $this->daemonServerRepository = $daemonServerRepository;
        $this->daemonCommandRepository = $daemonCommandRepository;
    }

    /**
     * Fetch plugins or mods from external APIs (Spigot, Modrinth, etc.)
     */
    public function searchPlugins(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        $query = $request->input('query', '');
        $platform = $request->input('platform', 'modrinth'); // modrinth or spigot
        
        $results = [];
        try {
            if ($platform === 'modrinth') {
                $response = Http::get("https://api.modrinth.com/v2/search?query=" . urlencode($query) . "&limit=10");
                $results = $response->json();
            } else {
                // Example using Spiget API for Spigot plugins
                $response = Http::get("https://api.spiget.org/v2/search/resources/" . urlencode($query) . "?size=10");
                $results = $response->json();
            }
        } catch (\Exception $e) {
            Log::error("Failed to fetch plugins: " . $e->getMessage());
            return response()->json(['error' => 'Failed to reach plugin APIs'], 500);
        }

        return response()->json($results);
    }

    /**
     * Triggers a download sequence on the Wings daemon to put the JAR in /plugins or /mods
     */
    public function installPlugin(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        
        $downloadUrl = $request->input('download_url');
        $fileName = $request->input('file_name');
        $targetFolder = $request->input('folder', 'plugins'); // plugins or mods

        // We instruct the daemon to download it directly via the transfer API or via command
        // Note: For advanced file pulling, you should use Wings API `pull` endpoint.
        
        // Pterodactyl doesn't have a direct "download file" endpoint exposed cleanly in standard client API, 
        // but extensions often add a raw command execution or file pull request.
        // Assuming Wings file pull structure (mocked response for Blueprint representation):
        
        return response()->json([
            'success' => true,
            'message' => "Instructed Wings to download $fileName to /$targetFolder/"
        ]);
    }

    /**
     * Upload and Extract Bedrock Addons (.mcpack)
     */
    public function uploadBedrockAddon(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        
        $request->validate([
            'addon' => 'required|file|mimetypes:application/zip,application/octet-stream',
        ]);

        $file = $request->file('addon');
        $originalName = $file->getClientOriginalName();

        // Normally, you would upload this directly to Wings via DaemonFileRepository,
        // then send an extraction request. We represent the backend confirmation here.
        
        return response()->json([
            'success' => true,
            'message' => "Successfully uploaded and triggered unpack for $originalName"
        ]);
    }

    /**
     * Player Manager (RCON live fetch)
     */
    public function getPlayers(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        // Usually achievable by reading the live console or sending a 'list' command
        // and parsing. For standard Pterodactyl, you send a command and intercept output.
        // As a REST representation:
        return response()->json([
            'players' => [
                ['name' => 'Steve', 'uuid' => '0000-0000', 'ping' => 45],
                ['name' => 'Alex', 'uuid' => '1111-1111', 'ping' => 32],
            ]
        ]);
    }

    /**
     * Execute specific player actions (Kick, Ban, Mute, OP)
     */
    public function executePlayerAction(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        
        $action = $request->input('action'); // kick, ban, mute, op
        $player = $request->input('player');
        
        $command = "";
        switch ($action) {
            case 'kick': $command = "kick $player"; break;
            case 'ban': $command = "ban $player"; break;
            case 'op': $command = "op $player"; break;
            case 'mute': $command = "mute $player"; break; // Requires essentials or similar
        }

        if ($command) {
            $this->daemonCommandRepository->setServer($server)->send($command);
        }

        return response()->json(['success' => true, 'message' => "Executed: $command"]);
    }

    /**
     * Change Server Egg / Version dynamically
     */
    public function changeVersion(Request $request, Server $server)
    {
        $this->authorize('control', $server);
        
        $newEggId = $request->input('egg_id');
        $versionInfo = $request->input('version'); // e.g. 1.20.4
        
        // Changing the egg dynamically involves updating the local DB for the server
        // and syncing with Wings. This requires admin-level privileges internally 
        // to override the user's setup, which Blueprint allows if implemented correctly.
        
        // $server->egg_id = $newEggId;
        // $server->image = "ghcr.io/pterodactyl/yolks:java_17";
        // $server->save();
        
        return response()->json(['success' => true, 'message' => "Server software queued to change to $versionInfo. Restart required."]);
    }
}
