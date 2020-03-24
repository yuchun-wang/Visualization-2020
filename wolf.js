let svg = d3.select('div.chart').append('svg').attr("class", "svg")

var div = d3.select('div.chart').append("div").attr("class", "tooltip").style("opacity", 0);

d3.csv("wolfdata.csv").then(function(data) {

      //Read
      var name = []
      var all = []
      var win = []
      var winrate = []
      var good = []
      var good_win = []
      var good_winrate = []
      var wolf = []
      var wolf_win = []
      var wolf_winrate = []

      data.forEach((d, i) => {
        name.push(d.name);
        all.push(d.all);
        win.push(d.win);
        winrate.push(d.winrate);
        good.push(d.good);
        good_win.push(d.good_win);
        good_winrate.push(d.good_winrate);
        wolf.push(d.wolf);
        wolf_win.push(d.wolf_win);
        wolf_winrate.push(d.wolf_winrate);
      });

      //Scale
      let xScale = d3.scaleLinear()
      .domain([0,3])
      .range([0,200]);

      let x = d3.scaleBand()
      .domain(name)
      .range([0,800]);

      let yScale = d3.scaleLinear()
      .domain([0,100])
      .range([400,0]);

      let y = d3.scaleLinear()
      .domain([0,1])
      .range([400,0]);

      //Axis_x
      x = svg.append('g')
      .attr("class", "axis")
      .attr("transform", "translate(99,470)")
      .call(d3.axisBottom(x));

      x_tag = svg.append("text")
      .attr("class", "axis_tag")
      .attr("transform", "translate(920,490)")
      .text("玩家");

      //Axis_y
      y = svg.append('g')
      .attr("class", "axis")
      .attr("transform", "translate(105,70)")
      .call(d3.axisLeft(y).ticks(10, "%"));

      y_tag = svg.append("text")
      .attr("class", "axis_tag")
      .attr("transform", "translate(60,45)")
      .text("勝率");

      //allbar
      allbar = svg.append('g')
      .selectAll('rect')
      .data(winrate)
      .enter()

      .append('rect')
      .attr("class", "allbar")
      .attr('x', (d, i) => xScale(i) + 110)
      .attr('y', 470)
      .attr('height', 0)
      .on('mouseover', mouseover_all)
      .on('mouseout', mouseout_all)
      .transition()
      .duration(3000)
      .attr('y', d => yScale(d) + 70)
      .attr('height', d => 400 - yScale(d))

      //goodbar
      goodbar = svg.append('g')
      .selectAll('rect')
      .data(good_winrate)
      .enter()

      .append('rect')
      .attr("class", "goodbar")
      .attr('x', (d, i) => xScale(i) + 125)
      .attr('y', 470)
      .attr('height', 0)
      .on('mouseover', mouseover_good)
      .on('mouseout', mouseout_good)
      .transition()
      .duration(3000)
      .attr('y', d => yScale(d) + 70)
      .attr('height', d => 400 - yScale(d))

      //wolfbar
      wolfbar = svg.append('g')
      .selectAll('rect')
      .data(wolf_winrate)
      .enter()

      .append('rect')
      .attr("class", "wolfbar")
      .attr('x', (d, i) => xScale(i) + 140)
      .attr('y', 470)
      .attr('height', 0)
      .on('mouseover', mouseover_wolf)
      .on('mouseout', mouseout_wolf)
      .transition()
      .duration(3000)
      .attr('y', d => yScale(d) + 70)
      .attr('height', d => 400 - yScale(d))

      //tag
      all_tag = svg.append("text")
      .attr("class", "tag")
      .attr("transform", "translate(910,50)")
      .text("總勝率");

      good_tag = svg.append("text")
      .attr("class", "tag")
      .attr("transform", "translate(910,75)")
      .text("正義聯盟勝率");

      wolf_tag = svg.append("text")
      .attr("class", "tag")
      .attr("transform", "translate(910,100)")
      .text("邪惡聯盟勝率");

      //color_tag
      all_tag_color = svg.append('rect')
      .attr("class", "all_tag_color")
      .attr("transform", "translate(890,37.5)")

      good_tag_color = svg.append('rect')
      .attr("class", "good_tag_color")
      .attr("transform", "translate(890,62.5)")

      wolf_tag_color = svg.append('rect')
      .attr("class", "wolf_tag_color")
      .attr("transform", "translate(890,87.5)")

      // mouse_event
      function mouseover_all(d, i) {
          d3.select(this).transition()
          .style('fill', '#453246')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .duration(200)
          .style("opacity", 0.9);

          div.html("[ " + name[i] + " ]" + "<br/>" + "總局數：" + all[i] + "<br/>" + "勝場：" + win[i] + "<br/>" + "勝率：" + winrate[i] + "%")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 120) + "px");
        }

      function mouseover_good(d, i) {
          d3.select(this).transition()
          .style('fill', '#453246')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .duration(200)
          .style("opacity", 0.9);

          div.html("[ " + name[i] + " ]" + "<br/>" + "正義聯盟局數：" + good[i] + "<br/>" + "正義聯盟勝場：" + good_win[i] + "<br/>" + "正義聯盟勝率：" + good_winrate[i] + "%")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 120) + "px");
        }

      function mouseover_wolf(d, i) {
          d3.select(this).transition()
          .style('fill', '#453246')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .style("opacity", 0.9);

          div.html("[ " + name[i] + " ]" + "<br/>" + "邪惡聯盟局數：" + wolf[i] + "<br/>" + "邪惡聯盟勝場：" + wolf_win[i] + "<br/>" + "邪惡聯盟勝率：" + wolf_winrate[i] + "%")
          .style("left", (d3.event.pageX + 10) + "px")
          .style("top", (d3.event.pageY - 120) + "px");
        }

      function mouseout_all(d, i) {
          d3.select(this).transition()
          .style('fill', '#FFD05B')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .style("opacity", 0);
        }

      function mouseout_good(d, i) {
          d3.select(this).transition()
          .style('fill', '#B04D5D')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .style("opacity", 0);
        }

      function mouseout_wolf(d, i) {
          d3.select(this).transition()
          .style('fill', '#F86254')
          .attr('y', d => yScale(d) + 70)
          .attr('height', d => 400 - yScale(d));

          div.transition()
          .style("opacity", 0);
        }
});
