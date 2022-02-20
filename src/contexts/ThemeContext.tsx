import React,{ useEffect } from 'react';

interface ITheme {
    name: string;
    styles: any;
}

const themes: ITheme[] = [
    {
        name: 'light',
        styles: {
            color: 'black',
            background: 'white'
        }
    },
    {
        name: 'dark',
        styles: {
            color: 'white',
            background: 'rgba(0, 0, 0, .2)'
        }
    }
]

interface IThemeProviderProps {
    children: React.ReactNode;
}

interface ThemeContextProps {
    theme: ITheme,
    themeStyles: object;
    setCurrentTheme: (name: string) => void;
  }

export const ThemeContext = React.createContext<ThemeContextProps>({
    theme: themes[0],
    themeStyles: themes[0].styles
} as ThemeContextProps);

export const ThemeProvider: React.FC<IThemeProviderProps> = ({ children }) => {
    const [theme, setTheme] = React.useState(themes[0]);
    
    const setCurrentTheme = (name: string) => {
        const newTheme: any = themes.find(n => n.name === name)
        setTheme(newTheme)
        localStorage.setItem('theme', JSON.stringify(newTheme))
    }

    useEffect(() => {
        const localTheme = localStorage.getItem('theme')
        if(localTheme) setTheme(JSON.parse(localTheme));
    }, [])

    return (
      <ThemeContext.Provider value={{
        theme,
        themeStyles: theme.styles,
        setCurrentTheme
    }}>
        {children}
      </ThemeContext.Provider>
    )
  }
  
export const useTheme = () => React.useContext(ThemeContext); 