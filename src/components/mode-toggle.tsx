import { ImSun } from 'react-icons/im'
import { RxMoon } from 'react-icons/rx'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/hooks'

export function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <div className='z-50'>
      <Button
        variant={'ghost'}
        size='icon'
        onClick={() => setTheme(theme == 'light' ? 'dark' : 'light')}
      >
        {theme == 'light' ? (
          <ImSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
        ) : (
          <RxMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
        )}
      </Button>
    </div>
  )
}
