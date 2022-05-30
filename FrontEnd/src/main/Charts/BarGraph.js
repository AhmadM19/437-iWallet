
import {ResponsiveBar} from '@nivo/bar';

export default function BarGraph({income_graph,expense_graph}){
    const Month={
        1:'Jan',
        2:'Feb',
		3:'Mar',
		4:'Apr',
		5:'May',
		6:'Jun',
		7:'Jul',
		8:'Aug',
		9:'Sep',
		10:'Oct',
		11:'Nov',
		12:'Dec'
     }
    return(
        <ResponsiveBar
                data={[ {
                    "month":Month[income_graph[5][0]],
                    "Income": income_graph[5][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense": -expense_graph[5][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  },
                  {
                    "month": Month[income_graph[4][0]],
                    "Income":income_graph[4][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense":-expense_graph[4][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  },
                  {
                    "month": Month[income_graph[3][0]],
                    "Income": income_graph[3][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense":-expense_graph[3][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  },
                  {
                    "month": Month[income_graph[2][0]],
                    "Income": income_graph[2][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense": -expense_graph[2][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  },
                  {
                    "month": Month[income_graph[1][0]],
                    "Income": income_graph[1][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense": -expense_graph[1][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  },
                  {
                    "month": Month[income_graph[0][0]],
                    "Income": income_graph[0][1],
                    "IncomeColor": "hsl(238, 70%, 50%)",
                    "Expense": -expense_graph[0][1],
                    "ExpenseColor": "hsl(330, 70%, 50%)",
                  }]}
                keys={[
                    'Income',
                    'Expense'
                ]}
                theme={ {
                    "legends": {
                        "text": {
                            "fontSize": 12,
                            "fill": "#ffffff"
                        }
                    },
                    "axis": {
                        "legend": {
                            "text": {
                                "fontSize": 12,
                                "fill": "#ffffff"
                            }
                        },
                        "ticks": {
                            "line": {
                                "stroke": "#ffffff",
                                "strokeWidth": 1
                            },
                            "text": {
                                "fontSize": 11,
                                "fill": "#ffffff"
                            }
                        }
                    }
                    
                }}
                indexBy="month"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'set2' }}
                defs={[
                    {
                        id: 'dots',
                        type: 'patternDots',
                        background: 'inherit',
                        color: '#38bcb2',
                        size: 4,
                        padding: 1,
                        stagger: true
                    },
                    {
                        id: 'lines',
                        type: 'patternLines',
                        background: 'inherit',
                        color: '#eed312',
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10
                    }
                ]}
                borderColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Months',
                    legendPosition: 'middle',
                    legendOffset: 32,
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: '',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{
                    from: 'color',
                    modifiers: [
                        [
                            'darker',
                            1.6
                        ]
                    ]
                }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                text: {
                    fontSize: 12,
                    fill: "#1343"
                },
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        role="application"
    />
)}