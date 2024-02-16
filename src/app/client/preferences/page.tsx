import { Separator } from "@/components/ui/separator"
import { NotificationsForm } from "./notificationsForm"

export default function SettingsNotificationsPage() {
  return (
    <div className="space-y-6 bg-white shadow-md p-6 rounded-md">
      <div>
        <h3 className="text-lg font-medium">Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure how we communicate.
        </p>
      </div>
      <Separator />
      <NotificationsForm />
    </div>
  )
}