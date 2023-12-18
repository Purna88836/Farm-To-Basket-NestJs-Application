function renderBarChart(productNames, actualQuantities, soldQuantities) {
    var barData = [
        { x: productNames, y: actualQuantities, name: 'Actual Quantity Available', type: 'bar' },
        { x: productNames, y: soldQuantities, name: 'Quantity Sold', type: 'bar' }
    ];

    var barLayout = {
        barmode: 'group',
        title: 'Product Quantity Overview',
        xaxis: { title: 'Product Name' },
        yaxis: { title: 'Quantity' }
    };

    console.log(actualQuantities, soldQuantities);

    Plotly.newPlot('barChart', barData, barLayout);
}

function renderScatterPlot(productNames, totalEarned) {
    var scatterData = [{
        x: productNames,
        y: totalEarned,
        mode: 'markers',
        type: 'scatter'
    }];

    var scatterLayout = {
        title: 'Products Sold',
        xaxis: { title: 'Product Name' },
        yaxis: { title: 'Amount Earned in Dollars' }
    };

    console.log(productNames, totalEarned);

    Plotly.newPlot('scatterChart', scatterData, scatterLayout);
}
