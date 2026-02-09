'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import { createClient } from '@/utils/supabase/server'

export async function updateProfile(formData: FormData) {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    const supabase = await createClient()

    const updates = {
        full_name: formData.get('full_name'),
        class_year: formData.get('class_year'),
        school: formData.get('school'),
        industry: formData.get('industry'),
        company: formData.get('company'),
        bio: formData.get('bio'),
        linkedin_url: formData.get('linkedin_url'),
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('clerk_user_id', userId)

    if (error) {
        console.error('Profile update error:', error.message)
        throw new Error('Failed to update profile. Please try again.')
    }

    revalidatePath('/profile')
}
