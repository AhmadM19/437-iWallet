import { ResponsivePie } from '@nivo/pie';


export default function PieChart({avg,max,min,std})
{
   return(
    <ResponsivePie
        data={[
            {
                "id": "Average",
                "label": "Average",
                "value": avg.toFixed(0),
                "color": "hsl(200, 70%, 50%)"
              },
            {
                "id": "Min",
                "label": "Min",
                "value": min.toFixed(0),
                "color": "hsl(200, 70%, 50%)"
            },
            {
                "id": " Max",
                "label": "Max",
                "value": max.toFixed(0),
                "color": "hsl(253, 70%, 50%)"
              },
              {
                "id": " Deviation",
                "label": "Deviation",
                "value": std.toFixed(0),
                "color": "hsl(253, 70%, 50%)"
              },
        ]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={{ scheme: 'set1' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#ffffff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        legends={[
            {
                anchor: 'left',
                direction: 'column',
                justify: false,
                translateX: -40,
                translateY: 56,
                itemsSpacing: 0,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
)
}