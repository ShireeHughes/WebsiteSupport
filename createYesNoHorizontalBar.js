{\rtf1\ansi\ansicpg1252\cocoartf1504\cocoasubrtf830
{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww10800\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 createYesNoHorizontalBar(filePath, element) \{\
\
var margin = \{top: 20, right: 30, bottom: 40, left: 30\},\
    width = $("#trinity-body").width()-margin.left-margin.right;//960 - margin.left - margin.right,\
    height = 400-margin.top-margin.bottom;//500 - margin.top - margin.bottom;\
\
var x = d3.scale.linear()\
    .range([0, width]);\
\
var y = d3.scale.ordinal()\
    .rangeRoundBands([0, height], .1);\
\
var xAxis = d3.svg.axis()\
    .scale(x)\
    .ticks(1)    \
    .orient("bottom");\
\
var yAxis = d3.svg.axis()\
    .scale(y)\
    .orient("left")\
    .tickSize(0)\
    .tickPadding(6);\
\
var svg = d3.select(\'93element\'94).append("svg")\
    .attr("width", width + margin.left + margin.right)\
    .attr("height", height + margin.top + margin.bottom)\
  .append("g")\
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");\
d3.tsv(\'93filePath\'94, type, function(error, data) \{\
  x.domain(d3.extent(data, function(d) \{ return d.value; \})).nice();\
  y.domain(data.map(function(d) \{ return d.name; \}));\
\
  svg.selectAll(".bar")\
      .data(data)\
    .enter().append("rect")\
      .attr("class", function(d) \{ return "bar bar--" + (d.value < 0 ? "negative" : "positive"); \})\
      .attr("x", function(d) \{ return x(Math.min(0, d.value)); \})\
      .attr("y", function(d) \{ return y(d.name); \})\
      .attr("width", function(d) \{ return Math.abs(x(d.value) - x(0)); \})\
      .attr("height", y.rangeBand());\
\
  svg.append("g")\
      .attr("class", "x axis")\
      .attr("transform", "translate(0," + height + ")")\
      .call(xAxis);\
\
  svg.append("g")\
      .attr("class", "y axis")\
      .attr("transform", "translate(" + x(0) + ",0)")\
      .call(yAxis);\
\});\
\
\}\
\
function type(d) \{\
  d.value = +d.value;\
  return d;\
\}\
}