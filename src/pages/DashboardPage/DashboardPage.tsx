import Statistic from "../../components/Statistic/Statistic";
import { BarChart, Legend, Bar , XAxis, YAxis, Tooltip } from 'recharts'
import './DashboardPage.scss';
import { useMemo } from "react";
import { Ticket } from "../../store/types/tickets";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import Header from '../../components/Header/Header'

interface obj {
  "day": string;
  "hight": number;
  "normal": number;
  "low": number;
}
const getData = (currentTickets: Ticket[]): obj[] => {
  const data: obj[] = []
  
  Array.from(Array(10)).forEach((_, index )=> {// Array.from(Array(10)) - за последние 10 дней
    const n = index * 86400000;//86400000 миллисекунд в часах = 24 часа
    let day = new Date(Date.now() - n).getDate()//получаем на каждой итерации предыдущий день, на первой итерации индекс = 0 то получаем текущий день

    let hight: number = 0;
    let normal: number = 0;
    let low: number = 0; 
    let filteredTickets: Ticket[] = currentTickets.filter(el => new Date(el.updatedAt.seconds * 1000).getDate() === day);//фильтруем - оставляя только те билеты которые соответсвуют текущему дню, что бы постоянно не перебирать все билеты ниже в цикле
    for(let i = 0; i < filteredTickets.length; i++) {
      const current = filteredTickets[i]
      if(current.priority === 'low') low++;
      if(current.priority === 'normal') normal++;
      if(current.priority === 'hight') hight++;
    }
    const obj: obj = {
      "day": `Day ${day}`,
      "hight": hight,
      "normal": normal,
      "low": low
    }
    data.push(obj)
  })
  return data.reverse();
}

const DashboardPage = () => {
    const { tickets } = useSelector((state: RootState) => state.tickets)
    
    const renderColorfulLegendText = (value: string): React.ReactNode  => {
      return <span style={{ color: 'black' }}>{value}</span>;
    };
    
    const data: obj[] = useMemo(() => getData(tickets), [tickets])

    return (
        <div className="dashboard-page">
          <Header title={'Dashboard'}/>
            <div className="container dashboard-page__container">
                <Statistic type="ALL"/>  
                <div className="rechart">
                  <BarChart  width={730} height={320} data={data} margin={{ top: 20 }}>
                    <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{stroke: 'rgba(255,255,255, .2)', fontSize: 12}}
                    />
                    <YAxis 
                    axisLine={false} 
                    tickLine={false}
                    tick={{stroke: 'rgba(255,255,255, .2)', fontSize: 12}}
                    type="number" 
                    domain={[0, 'dataMax']}
                    />
                    <Tooltip 
                    cursor={{fill: 'rgba(0,0,0,0.0)'}}
                    />
                    <Legend payload={[
                      { value: 'Hight', color: 'firebrick'},
                      { value: 'Normal', color: 'lightgreen'},
                      { value: 'Low', color: 'yellow'}]}
                      verticalAlign='top'
                      align="left"
                      width={300}
                      wrapperStyle={{ left: '30px', top: '-10px'}}
                      formatter={renderColorfulLegendText}
                      />
                    <Bar 
                    dataKey="hight" 
                    barSize={20} 
                    fill="firebrick"
                    stackId="a"
                    />
                    <Bar 
                    dataKey="normal" 
                    barSize={20} 
                    fill="lightgreen"
                    stackId="a"
                    />
                    <Bar 
                    dataKey="low" 
                    barSize={20} 
                    fill="yellow"
                    stackId="a"
                    radius={[10, 10, 0, 0]}
                    />
                  </BarChart>
                </div>
                <Statistic />
            </div>
        </div>
    )
}

export default DashboardPage;