'use client'
import {Button} from '@/components/ui/button'
import {DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { SunIcon, MoonIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="transition-all scale-100 dark:-rotate-90 dark:scale-0"/>
          <MoonIcon className="absolute transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100"/>
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
