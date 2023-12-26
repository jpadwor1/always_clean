import React from 'react'
import { ProfileForm } from '@/components/ProfileForm'
import { Separator } from '@/components/ui/separator'
const Page = () => {
  return (
    <div className="space-y-6 bg-white shadow-md p-6 rounded-md">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  )
}

export default Page
