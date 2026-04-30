import React, { useState, useEffect } from 'react';
import useFlash from '@/plugins/useFlash';
import http from '@/api/http';
import { ServerContext } from '@/state/server';
import PageContentBlock from '@/components/elements/PageContentBlock';
import FlashMessageRender from '@/components/FlashMessageRender';
import TitledGreyBox from '@/components/elements/TitledGreyBox';

export default () => {
    const [activeTab, setActiveTab] = useState<'plugins' | 'bedrock' | 'version' | 'players'>('plugins');
    const uuid = ServerContext.useStoreState(state => state.server.data!.uuid);
    const { clearFlashes, addFlash } = useFlash();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<any[]>([]);

    const [players, setPlayers] = useState<any[]>([]);

    const searchPlugins = async () => {
        clearFlashes();
        try {
            const { data } = await http.get(`/api/client/servers/${uuid}/skahost/plugins/search`, {
                params: { query: searchQuery }
            });
            setSearchResults(data.hits || []);
        } catch (error) {
            addFlash({ type: 'error', title: 'Error', message: 'Failed to find plugins.' });
        }
    };

    const installPlugin = async (url: string, name: string) => {
        try {
            await http.post(`/api/client/servers/${uuid}/skahost/plugins/install`, {
                download_url: url,
                file_name: name
            });
            addFlash({ type: 'success', title: 'Success', message: `Queued ${name} for installation.` });
        } catch(error) {
            addFlash({ type: 'error', title: 'Error', message: 'Failed to queue plugin.' });
        }
    };

    const executePlayerAction = async (player: string, action: string) => {
        try {
            await http.post(`/api/client/servers/${uuid}/skahost/players/action`, { player, action });
            addFlash({ type: 'success', title: 'Success', message: `Action ${action} executed on ${player}.` });
        } catch (error) {
            addFlash({ type: 'error', title: 'Error', message: 'Failed to execute action.' });
        }
    };

    const updateVersion = async () => {
        try {
            await http.post(`/api/client/servers/${uuid}/skahost/version/change`, { egg_id: 1, version: 'latest' });
            addFlash({ type: 'success', title: 'Success', message: `Server version update queued.` });
        } catch (error) {
            addFlash({ type: 'error', title: 'Error', message: 'Version change failed.' });
        }
    };

    return (
        <PageContentBlock title={'SKA HOST Manager'} showFlashKey={'skahost'}>
            <FlashMessageRender byKey={'skahost'} />

            <div className="flex bg-neutral-700/50 p-2 rounded-md mb-6 space-x-2">
                {['plugins', 'bedrock', 'version', 'players'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 rounded-md uppercase font-bold text-sm transition-colors ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-neutral-300 hover:bg-neutral-600'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {activeTab === 'plugins' && (
                <TitledGreyBox title="Plugin & Mod Installer" icon="fa fa-puzzle-piece">
                    <div className="flex gap-4 mb-4">
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search Modrinth..."
                            className="flex-1 bg-neutral-800 p-2 rounded-md text-white border border-neutral-700" 
                        />
                        <button onClick={searchPlugins} className="bg-blue-600 px-6 py-2 rounded-md font-semibold text-white">Search</button>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {searchResults.map((p, idx) => (
                            <div key={idx} className="bg-neutral-800 border border-neutral-700 p-4 rounded-md">
                                <h3 className="text-xl font-bold mb-2 text-white">{p.title}</h3>
                                <p className="text-sm text-neutral-400 mb-4 h-10 overflow-hidden">{p.description}</p>
                                <button className="bg-green-600 w-full py-2 rounded-md text-white" onClick={() => installPlugin('', p.title)}>
                                    Install via Modrinth
                                </button>
                            </div>
                        ))}
                    </div>
                </TitledGreyBox>
            )}

            {activeTab === 'players' && (
                <TitledGreyBox title="Player Manager" icon="fa fa-users">
                     <table className="w-full text-left text-neutral-300">
                         <thead>
                             <tr className="bg-neutral-800">
                                 <th className="p-3">Username</th>
                                 <th className="p-3">Ping</th>
                                 <th className="p-3 text-right">Actions</th>
                             </tr>
                         </thead>
                         <tbody>
                             <tr className="border-t border-neutral-700">
                                 <td className="p-3">Steve</td>
                                 <td className="p-3">45ms</td>
                                 <td className="p-3 text-right space-x-2">
                                     <button className="bg-red-600 px-3 py-1 rounded text-white text-sm" onClick={() => executePlayerAction('Steve', 'kick')}>Kick</button>
                                     <button className="bg-orange-600 px-3 py-1 rounded text-white text-sm" onClick={() => executePlayerAction('Steve', 'ban')}>Ban</button>
                                     <button className="bg-purple-600 px-3 py-1 rounded text-white text-sm" onClick={() => executePlayerAction('Steve', 'op')}>OP</button>
                                 </td>
                             </tr>
                         </tbody>
                     </table>
                </TitledGreyBox>
            )}

            {activeTab === 'bedrock' && (
                <TitledGreyBox title="Bedrock Addon Installer" icon="fa fa-cubes">
                    <div className="border-2 border-dashed border-neutral-600 rounded-lg p-12 text-center text-neutral-400">
                        <i className="fa fa-cloud-upload text-4xl mb-4"></i>
                        <h2 className="text-xl font-bold text-white mb-2">Drag & Drop .mcpack here</h2>
                        <p>Automatically separates resource and behavior packs.</p>
                        <input type="file" className="hidden" id="addon-upload" accept=".mcpack" />
                        <label htmlFor="addon-upload" className="mt-4 inline-block bg-blue-600 px-6 py-2 rounded-md text-white cursor-pointer hover:bg-blue-500">
                            Select File
                        </label>
                    </div>
                </TitledGreyBox>
            )}

            {activeTab === 'version' && (
                <TitledGreyBox title="Version & Egg Changer" icon="fa fa-exchange">
                    <div className="bg-neutral-800 p-4 rounded-md">
                        <label className="block text-sm text-neutral-400 mb-2">Server Software</label>
                        <select className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded-md text-white mb-4">
                            <option>Paper - 1.20.4</option>
                            <option>Vanilla - 1.20.4</option>
                            <option>Bedrock - Latest</option>
                            <option>Forge - 1.20.1</option>
                        </select>
                        <button className="bg-green-600 px-6 py-2 rounded-md text-white font-bold w-full" onClick={updateVersion}>
                            Apply & Restart Server
                        </button>
                    </div>
                </TitledGreyBox>
            )}
        </PageContentBlock>
    );
};
