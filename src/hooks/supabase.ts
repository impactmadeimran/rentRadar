import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import * as SecureStore from 'expo-secure-store'

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
        return SecureStore.getItemAsync(key)
    },
    setItem: (key: string, value: string) => {
        SecureStore.setItemAsync(key, value)
    },
    removeItem: (key: string) => {
        SecureStore.deleteItemAsync(key)
    },
}

const supabaseUrl = 'https://znmmijzwzimpkzcvotpd.supabase.co/'

export const supabase = createClient(supabaseUrl, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpubW1panp3emltcGt6Y3ZvdHBkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODA5OTI4MTIsImV4cCI6MTk5NjU2ODgxMn0.WgRmBUTghgPeV0j9YsRN42CzMhxyBs4f25vhNzEE9WI', {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})