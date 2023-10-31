import { UserButton } from '@clerk/nextjs'

import Logo from '@/components/Logo'
import ThemeSwitch from '@/components/ThemeSwitch'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex max-h-screen min-h-screen min-w-full flex-col bg-background">
      <nav className="flex h-[3.75rem] items-center justify-between border-b border-border px-4 py-2">
        <Logo />
        <div className="flex items-center gap-4">
          <ThemeSwitch />
          <UserButton afterSignOutUrl="/sign-in" />
        </div>
      </nav>
      <main className="flex w-full flex-grow">{children}</main>
    </div>
  )
}

export default DashboardLayout
