'use client';

import { useEffect, useState } from 'react';

interface Repo {
  name: string;
  drift: number;
  expertDiagnosis: string;
  violations: {
    layer: number;
    nPlusOne: number;
    godClass: number;
  };
  files: number;
  loc: number;
}

interface LandscapeMoat {
  generated: string;
  totalRepos: number;
  repos: Repo[];
}

function getStatusLabel(drift: number): { label: string; emoji: string; color: string } {
  if (drift < 1) {
    return { label: 'Rock Solid', emoji: '🟢', color: 'text-green-400' };
  } else if (drift < 5) {
    return { label: 'Stable', emoji: '🟡', color: 'text-yellow-400' };
  } else if (drift < 20) {
    return { label: 'Eroding', emoji: '🟠', color: 'text-orange-400' };
  } else {
    return { label: 'Critical', emoji: '🔴', color: 'text-red-400' };
  }
}

export default function Home() {
  const [data, setData] = useState<LandscapeMoat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/landscape-moat.json')
      .then(res => res.json())
      .then((data: LandscapeMoat) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl text-red-400">Failed to load data</div>
      </div>
    );
  }

  const sortedRepos = [...data.repos].sort((a, b) => a.drift - b.drift);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">ArchDrift Leaderboard</h1>
              <p className="text-gray-400 mt-1">
                Architectural drift analysis across {data.totalRepos} open-source repositories
              </p>
            </div>
            <a
              href="https://github.com/ArchDrift/archdrift"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              Pro Gatekeeper
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">Total Repos</div>
            <div className="text-2xl font-bold mt-1">{data.totalRepos}</div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">Average Drift</div>
            <div className="text-2xl font-bold mt-1">
              {(sortedRepos.reduce((sum, r) => sum + r.drift, 0) / sortedRepos.length).toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">Lowest Drift</div>
            <div className="text-2xl font-bold mt-1 text-green-400">
              {sortedRepos[0]?.drift.toFixed(1)}%
            </div>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
            <div className="text-gray-400 text-sm">Highest Drift</div>
            <div className="text-2xl font-bold mt-1 text-red-400">
              {sortedRepos[sortedRepos.length - 1]?.drift.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Repository</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Drift</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">Files</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-300">LOC</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Violations</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {sortedRepos.map((repo, index) => {
                  const status = getStatusLabel(repo.drift);
                  return (
                    <tr key={repo.name} className="hover:bg-gray-800/50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-400">#{index + 1}</td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-white">{repo.name}</div>
                        <div className="text-xs text-gray-500 mt-1 max-w-md truncate">
                          {repo.expertDiagnosis}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <span className={`text-lg font-bold ${status.color}`}>
                          {repo.drift.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`inline-flex items-center gap-1 ${status.color}`}>
                          <span>{status.emoji}</span>
                          <span className="text-sm">{status.label}</span>
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-400">
                        {repo.files.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-400">
                        {repo.loc.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        <div className="flex gap-2">
                          {repo.violations.layer > 0 && (
                            <span className="text-red-400" title="Layer Violations">
                              🚫 {repo.violations.layer}
                            </span>
                          )}
                          {repo.violations.godClass > 0 && (
                            <span className="text-orange-400" title="God Classes">
                              🚨 {repo.violations.godClass}
                            </span>
                          )}
                          {repo.violations.nPlusOne > 0 && (
                            <span className="text-yellow-400" title="N+1 Queries">
                              ⚠️ {repo.violations.nPlusOne}
                            </span>
                          )}
                          {repo.violations.layer === 0 && repo.violations.godClass === 0 && repo.violations.nPlusOne === 0 && (
                            <span className="text-green-400">✅ Clean</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Generated: {new Date(data.generated).toLocaleDateString()} •{' '}
            <a href="https://archdrift.com" className="text-blue-400 hover:text-blue-300">
              archdrift.com
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}
