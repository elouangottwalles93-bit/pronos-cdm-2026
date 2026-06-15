// ============================================================
// supabase-client.js – Connexion à Supabase
// ============================================================

import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm';

const SUPABASE_URL = 'https://vmapfqsusrndfwfzbney.supabase.co';     // ← Remplace
const SUPABASE_ANON_KEY = 'sb_publishable_Hmu1DU-CN6CRDq0UQKiz4Q_HJxFqRDv';        // ← Remplace

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ============================================================
// Fonctions utilitaires d'authentification par code unique
// ============================================================

// Connexion par code personnel
export async function loginByCode(code) {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .eq('code_unique', code.trim().toUpperCase())
        .single();

    if (error || !data) {
        return { success: false, error: 'Code invalide' };
    }

    // Stocker le joueur en session locale
    localStorage.setItem('player', JSON.stringify(data));
    return { success: true, player: data };
}

// Récupérer le joueur connecté
export function getCurrentPlayer() {
    const stored = localStorage.getItem('player');
    return stored ? JSON.parse(stored) : null;
}

// Déconnexion
export function logout() {
    localStorage.removeItem('player');
    window.location.href = 'index.html';
}

// Vérifier si admin
export function isAdmin() {
    const player = getCurrentPlayer();
    return player && player.is_admin === true;
}