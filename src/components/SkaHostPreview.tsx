import { Server, Users, Settings, Cpu, HardDrive, Network, Blocks, Upload, Repeat, Shield } from 'lucide-react';
import React, { useState } from 'react';

export default function SkaHostPreview() {
  const [activeTab, setActiveTab] = useState<'plugins' | 'bedrock' | 'version' | 'players'>('plugins');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dummy data for visual preview
  const dummyPlugins = [
    { title: 'EssentialsX', author: 'EssentialsX Team', desc: 'The essential plugin for Spigot servers.', downloads: '2M+' },
    { title: 'WorldEdit', author: 'EngineHub', desc: 'In-game Minecraft map editor.', downloads: '4M+' },
    { title: 'Vault', author: 'MilkBowl', desc: 'Permissions, Chat, & Economy API.', downloads: '3M+' },
    { title: 'Geyser', author: 'GeyserMC', desc: 'Enables clients from Minecraft Bedrock to join', downloads: '1M+' },
  ];

  const dummyPlayers = [
    { name: 'Notch', ping: '12ms', ip: '12.34.56.78', time: '4h 12m' },
    { name: 'Jeb_', ping: '34ms', ip: 'Hidden', time: '1h 2m' },
    { name: 'sdgamer8263', ping: '8ms', ip: 'Local', time: '2m' },
  ];

  return (
    <div className="min-h-screen bg-[#13151b] text-neutral-200 font-sans flex">
      {/* Fake Pterodactyl Sidebar */}
      <div className="w-64 bg-[#0d0e12] border-r border-neutral-800 hidden md:flex flex-col">
        <div className="p-4 bg-[#1f2937] border-b border-neutral-700 font-bold text-white tracking-wide flex items-center gap-2">
            <Server className="text-blue-500 w-5 h-5" />
            <span>SKA HOST PANEL</span>
        </div>
        <div className="p-4 bg-[#090a0c] text-xs text-neutral-400 font-mono flex flex-col gap-1">
            <span className="text-white text-sm font-bold">Minecraft Survival</span>
            <span>node1.skahost.com</span>
        </div>
        <div className="p-2 space-y-1">
          <div className="px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded cursor-pointer flex items-center gap-3">
              <HardDrive className="w-4 h-4"/> Console
          </div>
          <div className="px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded cursor-pointer flex items-center gap-3">
              <Network className="w-4 h-4"/> Network
          </div>
          <div className="px-3 py-2 text-blue-400 bg-blue-500/10 border-l-2 border-blue-500 rounded cursor-pointer flex items-center gap-3">
              <Blocks className="w-4 h-4"/> SKA HOST
          </div>
          <div className="px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded cursor-pointer flex items-center gap-3">
              <Settings className="w-4 h-4"/> Settings
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
         {/* Fake Pterodactyl Topbar */}
         <div className="h-14 border-b border-neutral-800 bg-[#13151b] flex flex-row px-6 items-center justify-between">
            <div className="flex gap-4 text-sm font-medium">
                <button className="text-blue-400 border-b-2 border-blue-500 pb-1 translate-y-[21px]">SKA HOST</button>
            </div>
            <div className="text-sm font-mono bg-neutral-800 px-3 py-1 rounded text-neutral-400">
                128.0.0.1:25565
            </div>
         </div>

         <div className="flex-1 overflow-y-auto p-6 lg:p-8">
            <h1 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Blocks className="text-blue-500" />
                SKA HOST Manager
            </h1>

            {/* Sub-Navigation (Specific to Extension) */}
            <div className="flex bg-[#1f2937] p-1.5 rounded-lg mb-8 space-x-1 lg:w-fit border border-neutral-700 shadow-sm">
                {[
                  { id: 'plugins', label: 'Mod/Plugin Installer', icon: <Blocks className="w-4 h-4" /> },
                  { id: 'bedrock', label: 'Bedrock Addons', icon: <Upload className="w-4 h-4" /> },
                  { id: 'version', label: 'Version Changer', icon: <Repeat className="w-4 h-4" /> },
                  { id: 'players', label: 'Player Manager', icon: <Users className="w-4 h-4" /> }
                ].map(tab => (
                    <button 
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`px-4 py-2 rounded-md font-semibold text-sm transition-all duration-200 flex items-center gap-2
                            ${activeTab === tab.id ? 'bg-blue-600 text-white shadow' : 'text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200'}`}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            {/* Panel Content Wrapper */}
            <div className="max-w-6xl">
                {activeTab === 'plugins' && (
                    <div className="space-y-6">
                        <div className="bg-[#1f2937] border border-neutral-700 rounded-lg p-6 shadow-sm">
                            <h2 className="text-lg font-bold text-white mb-4">Plugin & Mod Installer</h2>
                            <p className="text-neutral-400 text-sm mb-6">Search and install plugins from SpigotMC or Modrinth directly to your server's plugins/mods folder. Will automatically restart your server if applied.</p>
                            
                            <div className="flex gap-3 mb-6">
                                <div className="flex-1 flex bg-[#0d0e12] border border-neutral-700 rounded-md overflow-hidden focus-within:border-blue-500 transition-colors">
                                    <input 
                                        type="text" 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for plugins or mods..."
                                        className="w-full bg-transparent px-4 py-2.5 text-sm text-neutral-200 outline-none" 
                                    />
                                </div>
                                <select className="bg-[#0d0e12] border border-neutral-700 rounded-md px-4 py-2.5 text-sm outline-none focus:border-blue-500">
                                    <option>Modrinth</option>
                                    <option>SpigotMC</option>
                                    <option>CurseForge</option>
                                </select>
                                <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-md font-bold text-sm transition-colors shadow">
                                    Search
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dummyPlugins.map((plugin, idx) => (
                                    <div key={idx} className="bg-[#0d0e12] border border-neutral-800 p-5 rounded-lg flex flex-col justify-between group hover:border-neutral-600 transition-colors">
                                        <div>
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-blue-400 text-base">{plugin.title}</h3>
                                                <span className="text-xs font-mono bg-neutral-800 text-neutral-400 px-2 py-1 rounded">{plugin.downloads}</span>
                                            </div>
                                            <p className="text-xs text-neutral-500 mb-3">By {plugin.author}</p>
                                            <p className="text-sm text-neutral-300 leading-relaxed h-10">{plugin.desc}</p>
                                        </div>
                                        <button className="mt-4 w-full bg-neutral-800 hover:bg-green-600 text-neutral-300 hover:text-white py-2 rounded font-semibold text-sm transition-colors">
                                            1-Click Install
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'bedrock' && (
                    <div className="bg-[#1f2937] border border-neutral-700 rounded-lg p-6 shadow-sm min-h-[400px] flex flex-col">
                        <h2 className="text-lg font-bold text-white mb-2">Bedrock Addon Installer</h2>
                        <p className="text-neutral-400 text-sm mb-8">Upload `.mcpack` or `.mcaddon` files. Our system will automatically unzip and distribute behavior packs and resource packs to the correct locations.</p>
                        
                        <div className="flex-1 border-2 border-dashed border-neutral-600 hover:border-blue-500 bg-[#0d0e12] hover:bg-[#13151b] transition-all rounded-xl flex flex-col justify-center items-center text-center cursor-pointer group">
                            <div className="bg-neutral-800 p-4 rounded-full mb-4 group-hover:bg-blue-500/20 transition-colors">
                                <Upload className="w-8 h-8 text-neutral-400 group-hover:text-blue-500" />
                            </div>
                            <h3 className="text-lg font-bold text-neutral-200 mb-2">Drag & Drop .mcpack here</h3>
                            <p className="text-sm text-neutral-500 mb-6 max-w-sm">Or click below to browse your local computer. Large files may take a few minutes to extract.</p>
                            
                            <button className="bg-neutral-700 hover:bg-neutral-600 px-6 py-2 rounded-md font-semibold text-white shadow-sm transition-colors">
                                Browse Files
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'version' && (
                    <div className="bg-[#1f2937] border border-neutral-700 rounded-lg p-6 shadow-sm max-w-2xl">
                        <h2 className="text-lg font-bold text-white mb-4">Version & Egg Changer</h2>
                        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 p-4 rounded-md text-sm mb-6 flex gap-3">
                            <Shield className="w-5 h-5 flex-shrink-0" />
                            <p>Changing the server software will update the Docker image and startup command. <strong>It is highly recommended to take a backup before proceeding.</strong></p>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2">Server Software Type</label>
                                <select className="w-full bg-[#0d0e12] border border-neutral-700 p-3 rounded-md text-neutral-200 outline-none focus:border-blue-500 appearance-none">
                                    <option>PaperMC (High Performance Java)</option>
                                    <option>Vanilla Minecraft</option>
                                    <option>Bedrock Dedicated Server</option>
                                    <option>Forge / Fabric</option>
                                    <option>Geyser Standalone</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-neutral-300 mb-2">Minecraft Version</label>
                                <select className="w-full bg-[#0d0e12] border border-neutral-700 p-3 rounded-md text-neutral-200 outline-none focus:border-blue-500 appearance-none">
                                    <option>1.20.4 (Latest Release)</option>
                                    <option>1.20.2</option>
                                    <option>1.19.4</option>
                                    <option>1.18.2</option>
                                    <option>1.8.8 (Legacy)</option>
                                </select>
                            </div>

                            <div className="bg-[#0d0e12] p-4 rounded-md border border-neutral-800 text-xs font-mono text-neutral-500">
                                Target Docker Image: ghcr.io/pterodactyl/yolks:java_17<br/>
                                Pre-flight checks: PASS
                            </div>

                            <button className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-md text-white font-bold w-full shadow transition-colors">
                                Change Version & Restart Server
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === 'players' && (
                    <div className="bg-[#1f2937] border border-neutral-700 rounded-lg p-6 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h2 className="text-lg font-bold text-white mb-1">Live Player Manager</h2>
                                <p className="text-neutral-400 text-sm">Manage players via RCON. Requires server to be online.</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-3 w-3">
                                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                </span>
                                <span className="text-sm font-bold text-green-500">3/20 Online</span>
                            </div>
                        </div>

                        <div className="overflow-x-auto border border-neutral-700 rounded-lg">
                            <table className="w-full text-left text-sm whitespace-nowrap">
                                <thead>
                                    <tr className="bg-[#0d0e12] text-neutral-400 border-b border-neutral-700">
                                        <th className="p-4 font-semibold">Player Name</th>
                                        <th className="p-4 font-semibold">Playtime</th>
                                        <th className="p-4 font-semibold">Ping</th>
                                        <th className="p-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dummyPlayers.map((player, i) => (
                                        <tr key={i} className="border-b border-neutral-700/50 hover:bg-neutral-800/50 transition-colors">
                                            <td className="p-4 flex items-center gap-3">
                                                <img src={`https://minotar.net/helm/${player.name}/32.png`} alt="" className="w-8 h-8 rounded bg-neutral-800" />
                                                <span className="font-semibold text-neutral-200">{player.name}</span>
                                            </td>
                                            <td className="p-4 text-neutral-400">{player.time}</td>
                                            <td className="p-4 font-mono text-green-400">{player.ping}</td>
                                            <td className="p-4 text-right space-x-2">
                                                <button className="bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Kick</button>
                                                <button className="bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Ban</button>
                                                <button className="bg-neutral-700 hover:bg-neutral-600 text-white px-3 py-1.5 rounded text-xs font-bold transition-colors">Op</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
         </div>
      </div>
    </div>
  );
}
