'use client';

import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import type { User } from '@supabase/supabase-js';

interface ApiKeyRow {
  id: string;
  name: string;
  prefix: string;
  environment: string;
  scopes: string[];
  is_active: boolean;
  last_used_at: string | null;
  created_at: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [keys, setKeys] = useState<ApiKeyRow[]>([]);
  const [newKeySecret, setNewKeySecret] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [keyName, setKeyName] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user: u } }) => {
      if (!u) {
        router.push('/login');
        return;
      }
      setUser(u);
      setLoading(false);
    });
  }, [router]);

  const fetchKeys = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.functions.invoke('manage-api-keys', {
      method: 'GET',
    });
    if (data?.keys) setKeys(data.keys);
  }, [user]);

  useEffect(() => {
    if (user) fetchKeys();
  }, [user, fetchKeys]);

  async function createKey() {
    setCreating(true);
    const { data } = await supabase.functions.invoke('manage-api-keys', {
      body: { name: keyName || 'Default Key', environment: 'live', scopes: ['read', 'write'] },
    });
    if (data?.key?.secret) {
      setNewKeySecret(data.key.secret);
      await fetchKeys();
    }
    setCreating(false);
    setShowCreateForm(false);
    setKeyName('');
  }

  async function revokeKey(keyId: string) {
    await supabase.functions.invoke(`manage-api-keys/${keyId}`, {
      method: 'DELETE',
    });
    await fetchKeys();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push('/');
  }

  if (loading) {
    return (
      <div className="auth-container">
        <div className="animate-skeleton-pulse" style={{ width: 200, height: 20, borderRadius: 'var(--radius-md)', background: 'var(--bg-elevated)' }} />
      </div>
    );
  }

  return (
    <div className="cove-content" style={{ paddingBottom: '96px' }}>
      {/* Header */}
      <div className="dashboard-header">
        <div className="flex items-center justify-between">
          <div>
            <h1>Dashboard</h1>
            <p style={{ fontSize: 'var(--text-body-sm)', marginTop: '4px' }}>
              {user?.email}
            </p>
          </div>
          <button onClick={handleSignOut} className="btn btn-ghost btn-sm">
            Sign out
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-label">Plan</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-heading-md)' }}>Free</div>
          <a href="/pricing" style={{ fontSize: 'var(--text-caption)', color: '#a5b4fc', marginTop: '8px', display: 'inline-block' }}>
            Upgrade →
          </a>
        </div>
        <div className="stat-card">
          <div className="stat-label">API Keys</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-heading-md)' }}>
            {keys.filter(k => k.is_active).length}
          </div>
          <div className="stat-change" style={{ color: 'var(--text-muted)' }}>of 5 max</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Requests Today</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-heading-md)' }}>—</div>
          <div className="stat-change" style={{ color: 'var(--text-muted)' }}>of 100 daily limit</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Requests This Month</div>
          <div className="stat-value" style={{ fontSize: 'var(--text-heading-md)' }}>—</div>
          <div className="stat-change" style={{ color: 'var(--text-muted)' }}>of 1,000 monthly limit</div>
        </div>
      </div>

      {/* New key secret banner */}
      {newKeySecret && (
        <div
          className="card animate-in"
          style={{
            marginBottom: '24px',
            padding: '20px 24px',
            background: 'rgba(99, 102, 241, 0.06)',
            borderColor: 'var(--accent)',
          }}
        >
          <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
            <strong style={{ fontSize: 'var(--text-body-sm)' }}>🔑 Your new API key — save it now</strong>
            <button onClick={() => setNewKeySecret(null)} className="btn btn-ghost btn-sm">
              Dismiss
            </button>
          </div>
          <div style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-body-sm)',
            background: 'var(--bg)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            wordBreak: 'break-all',
          }}>
            {newKeySecret}
          </div>
          <p style={{ fontSize: 'var(--text-caption)', color: 'var(--warning)', marginTop: '8px' }}>
            ⚠️ This secret will not be shown again. Copy it now.
          </p>
        </div>
      )}

      {/* API Keys Table */}
      <div className="table-container">
        <div className="table-header">
          <h3>API Keys</h3>
          {!showCreateForm && (
            <button onClick={() => setShowCreateForm(true)} className="btn btn-primary btn-sm">
              + Create key
            </button>
          )}
        </div>

        {showCreateForm && (
          <div style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="flex items-center" style={{ gap: '12px' }}>
              <input
                type="text"
                className="input"
                placeholder="Key name (e.g. Production)"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                style={{ maxWidth: '280px' }}
              />
              <button onClick={createKey} className="btn btn-primary btn-sm" disabled={creating}>
                {creating ? 'Creating…' : 'Create'}
              </button>
              <button onClick={() => setShowCreateForm(false)} className="btn btn-ghost btn-sm">
                Cancel
              </button>
            </div>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Prefix</th>
              <th>Environment</th>
              <th>Status</th>
              <th>Last Used</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {keys.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 24px' }}>
                  No API keys yet. Create one to get started.
                </td>
              </tr>
            ) : (
              keys.map((key) => (
                <tr key={key.id}>
                  <td style={{ color: 'var(--text)', fontWeight: 500 }}>{key.name}</td>
                  <td>
                    <code style={{ fontSize: 'var(--text-caption)' }}>{key.prefix}_•••</code>
                  </td>
                  <td>
                    <span className={`badge ${key.environment === 'live' ? 'badge-success' : 'badge-warning'}`}>
                      {key.environment}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${key.is_active ? 'badge-success' : 'badge-error'}`}>
                      {key.is_active ? 'Active' : 'Revoked'}
                    </span>
                  </td>
                  <td className="rail-mono">
                    {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="rail-mono">
                    {new Date(key.created_at).toLocaleDateString()}
                  </td>
                  <td>
                    {key.is_active && (
                      <button
                        onClick={() => revokeKey(key.id)}
                        className="btn btn-ghost btn-sm"
                        style={{ color: 'var(--error)' }}
                      >
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Quick Start */}
      <div className="card" style={{ marginTop: '32px', padding: '32px' }}>
        <h4 style={{ marginBottom: '12px' }}>Quick start</h4>
        <p style={{ marginBottom: '16px', fontSize: 'var(--text-body-sm)' }}>
          Use your API key to authenticate requests:
        </p>
        <pre>
          <code>{`curl https://etgzrzpubauiciufjqan.supabase.co/functions/v1/api-gateway \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}</code>
        </pre>
      </div>
    </div>
  );
}
