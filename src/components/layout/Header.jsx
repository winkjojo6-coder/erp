import { Menu, Moon, Sun } from 'lucide-react'
import { useSelector, useDispatch } from 'react-redux'
import { setTheme } from '../../store/slices/uiSlice'

export default function Header({ onToggleSidebar }) {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(newTheme))
  }

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-6">
      {/* Left */}
      <button
        onClick={onToggleSidebar}
        className="p-2 hover:bg-secondary rounded-lg transition-colors"
        title="Toggle Sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>


      </div>
    </header>
  )
}
