import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Ticket } from "../../store/types/tickets";
import Box from '@mui/material/Box';
import { useTheme } from "../../contexts/ThemeContext";

const stylesItem = (themeStyle: any) => {
    return {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: themeStyle.background,
        color: themeStyle.color,
        boxShadow: 'rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px',
        height: 'inherit',
        borderRadius: '10px'
    }
}
const calcStatistic = (elements: Ticket[]) => {
    let hight = 0;
    let low = 0;
    let normal = 0;
    let progress = 0;

    for(let i = 0; i < elements.length; i++) {
        let n = elements[i]
        if(n.priority === 'normal') normal++;
        if(n.priority === 'low') low++;
        if(n.priority === 'hight') hight++;
        if(n.status === 'progress') progress++;
    }
    let procentProgress = Math.floor(progress * 100 / elements.length) || 0;
    return {
        hight,
        normal,
        low,
        progress,
        procentProgress
    }
}

interface IStatistic {
    type?: 'ALL'
}

const Statistic: FC<IStatistic> = ({ type }) => {
    const { tickets } = useSelector((state: RootState) => state.tickets)
    const { user } = useSelector((state: RootState) => state.auth)
    const { theme } = useTheme()
    const statisticAll = useMemo(() => calcStatistic(tickets), [tickets])
    const statisticForMe = useMemo(() => {
        let filteredTickets = tickets.filter(n => n.userId === user?.userId)
        return calcStatistic(filteredTickets)
    }, [tickets, user])
    
    return (
        <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2} style={{ padding: '10px 0'}}>
            <Box gridColumn="span 3" sx={{ height: '100px' }}>
                <div style={stylesItem(theme.styles)}>{type === 'ALL' ? statisticAll.hight : statisticForMe.hight}</div>
            </Box>
            <Box gridColumn="span 3" sx={{ height: '100px' }}>
                <div style={stylesItem(theme.styles)}>{type === 'ALL' ? statisticAll.normal : statisticForMe.normal}</div>
            </Box>
            <Box gridColumn="span 3" sx={{ height: '100px' }}>
                <div style={stylesItem(theme.styles)}>{type === 'ALL' ? statisticAll.low : statisticForMe.low}</div>
            </Box>
            <Box gridColumn="span 3" sx={{ height: '100px' }}>
                <div style={stylesItem(theme.styles)}>
                <span>
                    {type === 'ALL' ? statisticAll.procentProgress : statisticForMe.procentProgress}%
                </span>
                <span style={{ margin: ' 0 4px' }}>/</span>
                <span>
                    {type === 'ALL' ? statisticAll.progress : statisticForMe.progress}
                </span>
                </div>
            </Box>
        </Box>
    );
}

export default Statistic;