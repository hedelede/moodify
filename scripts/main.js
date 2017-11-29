/*

    Smart Power

    Copyright (C) 2016 Sylvain Bechet <sbec582@aucklanduni.ac.nz>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.
        
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
        
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

*/
//Attributing variable names to shorten function calls
var currentBtn = document.getElementById("currentBtn");
var voltageBtn = document.getElementById("voltageBtn");
var powerBtn = document.getElementById("powerBtn");
var welcomeMessageContainer = document.getElementById("welcomeMessage");
var currentGraphContainer = document.getElementById("IGraph");
var voltageGraphContainer = document.getElementById("VGraph");
var powerGraphContainer = document.getElementById("PGraph");
var currentGraph = document.getElementById("currentGraph");
var voltageGraph = document.getElementById("voltageGraph");
var powerGraph = document.getElementById("powerGraph");
//Implementation of current button
currentBtn.addEventListener("click", function () {
    dispCurrentGraph();
});
//Implementation of current button
voltageBtn.addEventListener("click", function () {
    dispVoltageGraph();
});
//Implementation of current button
powerBtn.addEventListener("click", function () {
    dispPowerGraph();
});
//Go to current graph
function dispCurrentGraph() {
    welcomeMessageContainer.style.display = "none";
    currentGraphContainer.style.display = "block";
    voltageGraphContainer.style.display = "none";
    powerGraphContainer.style.display = "none";
}
//Go to voltage graph
function dispVoltageGraph() {
    welcomeMessageContainer.style.display = "none";
    currentGraphContainer.style.display = "none";
    voltageGraphContainer.style.display = "block";
    powerGraphContainer.style.display = "none";
}
//Go to power graph
function dispPowerGraph() {
    welcomeMessageContainer.style.display = "none";
    currentGraphContainer.style.display = "none";
    voltageGraphContainer.style.display = "none";
    powerGraphContainer.style.display = "block";
}
//Set up a limit of 50 points plotted at a time
var j = 0, k = 50, boundaryFlag = true;
//Graphing using the graphing script
function makeplot() {
    Plotly.d3.csv("data.csv", function (data) { processData(data); });
    //Updating limits after every call until reaching an upper limit
    if (boundaryFlag) {
        j++;
        k++;
    }
}
;
//Processing data for graphs
function processData(allRows) {
    console.log(allRows);
    var t = [], I = [], V = [], P = [], standard_deviation = [];
    for (var i = j; i < allRows.length; i++) {
        row = allRows[i];
        t.push(row['time']);
        I.push(row['current']);
        V.push(row['voltage']);
        P.push(row['power']);
        //makes sure only 50 points are plotted at a time
        if (i > k) {
            break;
        }
        //make sure limits stop incrementing if no data is input
        if (k == allRows.length) {
            boundaryFlag = false;
        }
        else {
            boundaryFlag = true;
        }
    }
    makePlotly(t, I, V, P, standard_deviation);
}
//Setup the different graphs
function makePlotly(t, I, V, P, standard_deviation) {
    var plotDiv = document.getElementById("plot");
    //Setting for current graph
    var trace1 = [{
            x: t,
            y: I,
            smoothing: 1.3,
            line: { color: 'rgb(0,0,0)', shape: 'spline' },
            type: 'scatter',
            autosizable: true,
            fillFrame: true,
            connectgaps: true
        }];
    //Setting for voltage graph
    var trace2 = [{
            x: t,
            y: V,
            smoothing: 1.3,
            line: { color: 'rgb(0,0,0)', shape: 'spline' },
            type: 'scatter',
            autosizable: true,
            fillFrame: true,
            connectgaps: true
        }];
    //Setting for power graph
    var trace3 = [{
            x: t,
            y: P,
            smoothing: 1.3,
            line: { color: 'rgb(0,0,0)', shape: 'spline' },
            type: 'scatter',
            autosizable: true,
            fillFrame: true,
            connectgaps: true
        }];
    //Current plot name
    Plotly.newPlot('currentGraph', trace1, { title: 'Current vs Time' }, { displayModeBar: false });
    //Voltage plot name
    Plotly.newPlot('voltageGraph', trace2, { title: 'Voltage vs Time' }, { displayModeBar: false });
    //Power plot name
    Plotly.newPlot('powerGraph', trace3, { title: 'Power vs Time' }, { displayModeBar: false });
}
;
//Call the plot function 5 times every second
window.setInterval(function () {
    makeplot();
}, 2000); // <----Calls function at every delay, in milliseconds (200 = Function called 5 times per second)
