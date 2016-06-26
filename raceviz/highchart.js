$(function () {
    $('#container').highcharts({
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Stacked bar chart'
        },
        xAxis: {
            categories: ['White', 'Black', 'Am. Indian/Native', 'Asian', 'Native Hawaiian', 'Some Other Race']
        },
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: 'Level of Education'
            }
        },
        legend: {
            reversed: true
        },
        plotOptions: {
            series: {
                stacking: 'normal'
            }
        },
        series: [{
            name: 'Professional or Higher',
          	data: [7, 3, 5, 14, 0, 1]
        }, {
           name: 'B.A',
         	 data: [12, 6, 9, 18, 4, 5]
        }, {
            name: 'Some College/Associate',
            data: [26, 25, 26, 22, 28, 14]
        },
        {
            name: 'H.S./GED',
          	data: [26, 27, 20, 15, 33, 18]
        },
        {
            name: 'No H.S.',
        	data: [27, 36, 37, 29, 33, 61]
        }

        ]
    });
});
