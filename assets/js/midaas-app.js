(function() {
  var DataRequesterAbstract, base;

  DataRequesterAbstract = (function() {
    DataRequesterAbstract.prototype.apiUrlBase = "https://brbimhg0w9.execute-api.us-west-2.amazonaws.com/dev/";

    function DataRequesterAbstract(chart) {
      var base, ref;
      this.chart = chart;
      this.config = (ref = this.chart.config) != null ? ref.dataRequester : void 0;
      if ((base = this.config).query == null) {
        base.query = {};
      }
    }

    DataRequesterAbstract.prototype.fetchData = function(callback) {
      var data, err;
      err = null;
      data = null;
      return callback(err, data);
    };

    DataRequesterAbstract.prototype.react = function(queryUpdate) {
      return null;
    };

    DataRequesterAbstract.prototype.closeObservers = function() {
      var observer, observerKey, ref, results;
      ref = this.observers;
      results = [];
      for (observerKey in ref) {
        observer = ref[observerKey];
        results.push(observer.close());
      }
      return results;
    };

    DataRequesterAbstract.prototype.destroy = function() {
      return this.closeObservers();
    };

    return DataRequesterAbstract;

  })();

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).DataRequester == null) {
    base.DataRequester = {};
  }

  window.Ag.DataRequester.Abstract = DataRequesterAbstract;

}).call(this);

(function() {
  var DataRequesterIncomeQuantilesCompare, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DataRequesterIncomeQuantilesCompare = (function(superClass) {
    extend(DataRequesterIncomeQuantilesCompare, superClass);

    function DataRequesterIncomeQuantilesCompare() {
      this.fetchData = bind(this.fetchData, this);
      this.getApiUrl = bind(this.getApiUrl, this);
      return DataRequesterIncomeQuantilesCompare.__super__.constructor.apply(this, arguments);
    }

    DataRequesterIncomeQuantilesCompare.prototype.getApiUrl = function() {
      return this.apiUrlBase + "income/quantiles";
    };

    DataRequesterIncomeQuantilesCompare.prototype.fetchData = function(callback) {
      var compare, compareAge, compareGender, compareQuantile, compareRace, compareRegion, params, query, ref, ref1, ref2, ref3, ref4, ref5, url;
      params = [];
      url = this.getApiUrl();
      query = (ref = this.config) != null ? ref.query : void 0;
      compare = (ref1 = query.compare) != null ? ref1.toLowerCase() : void 0;
      switch (compare) {
        case "race":
          params.push("compare=race");
          break;
        case "gender":
        case "sex":
          params.push("compare=sex");
          break;
        case "age":
          params.push("compare=agegroup");
          break;
        case "state":
          params.push("compare=state");
      }
      compareRegion = (ref2 = query.compareRegion) != null ? ref2.toUpperCase() : void 0;
      if (compareRegion && compareRegion !== "US") {
        params.push("state=" + encodeURIComponent(compareRegion));
      }
      compareRace = (ref3 = query.compareRace) != null ? ref3.toLowerCase() : void 0;
      if (compareRace) {
        params.push("race=" + encodeURIComponent(compareRace));
      }
      compareGender = (ref4 = query.compareGender) != null ? ref4.toLowerCase() : void 0;
      if (compareGender) {
        params.push("sex=" + encodeURIComponent(compareGender));
      }
      compareAge = (ref5 = query.compareAge) != null ? ref5.toLowerCase() : void 0;
      if (compareAge) {
        params.push("agegroup=" + encodeURIComponent(compareAge));
      }
      compareQuantile = query.compareQuantile;
      if (parseInt(compareQuantile) >= 0 && parseInt(compareQuantile) <= 100) {
        params.push("quantile=" + compareQuantile);
      }
      if (params.length) {
        url += "?" + params.join('&');
      }
      return $.ajax({
        dataType: "json",
        url: url,
        timeout: 10000
      }).done((function(_this) {
        return function(data) {
          data.xLabel = "Quantile";
          data.yLabel = "Earnings ($s)";
          return callback(null, data);
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return callback(err);
        };
      })(this));
    };

    return DataRequesterIncomeQuantilesCompare;

  })(Ag.DataRequester.Abstract);

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).DataRequester == null) {
    base.DataRequester = {};
  }

  window.Ag.DataRequester.IncomeQuantilesCompare = DataRequesterIncomeQuantilesCompare;

}).call(this);

(function() {
  var DataRequesterIncomeQuantileRatio, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  DataRequesterIncomeQuantileRatio = (function(superClass) {
    extend(DataRequesterIncomeQuantileRatio, superClass);

    function DataRequesterIncomeQuantileRatio() {
      this.fetchData = bind(this.fetchData, this);
      this.getApiUrl = bind(this.getApiUrl, this);
      return DataRequesterIncomeQuantileRatio.__super__.constructor.apply(this, arguments);
    }

    DataRequesterIncomeQuantileRatio.prototype.getApiUrl = function() {
      return this.apiUrlBase + "income/quantiles";
    };

    DataRequesterIncomeQuantileRatio.prototype.fetchData = function(callback) {
      var compare, compareQuantile, params, paramsDenominator, paramsNumerator, query, ratioDenominator, ratioNumerator, ratioType, ref, ref1, ref2, ref3, ref4, url;
      params = [];
      url = this.getApiUrl();
      query = (ref = this.config) != null ? ref.query : void 0;
      compare = (ref1 = query.compare) != null ? ref1.toLowerCase() : void 0;
      switch (compare) {
        case "race":
          params.push("compare=race");
          break;
        case "gender":
        case "sex":
          params.push("compare=sex");
          break;
        case "age":
          params.push("compare=agegroup");
          break;
        case "state":
          params.push("compare=state");
      }
      compareQuantile = query.compareQuantile;
      if (parseInt(compareQuantile) >= 0 && parseInt(compareQuantile) <= 100) {
        params.push("quantile=" + compareQuantile);
      }
      ratioType = (ref2 = query.ratioType) != null ? ref2.toLowerCase() : void 0;
      ratioNumerator = (ref3 = query.ratioNumerator) != null ? ref3.toLowerCase() : void 0;
      ratioDenominator = (ref4 = query.ratioDenominator) != null ? ref4.toLowerCase() : void 0;
      paramsNumerator = params.concat(ratioType + "=" + ratioNumerator);
      paramsDenominator = params.concat(ratioType + "=" + ratioDenominator);
      return $.when($.ajax({
        dataType: "json",
        url: url + "?" + (paramsNumerator.join('&')),
        timeout: 10000
      }), $.ajax({
        dataType: "json",
        url: url + "?" + (paramsDenominator.join('&')),
        timeout: 10000
      })).done((function(_this) {
        return function(nResponse, dResponse) {
          var dData, data, nData, quantile, state;
          nData = nResponse[0];
          dData = dResponse[0];
          data = {};
          for (state in nData) {
            for (quantile in nData[state]) {
              if (data[state] == null) {
                data[state] = {};
              }
              data[state][quantile] = nData[state][quantile] / dData[state][quantile];
            }
          }
          data.yLabel = "Ratio " + ratioNumerator + "/" + ratioDenominator;
          return callback(null, data);
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return callback(err);
        };
      })(this));
    };

    return DataRequesterIncomeQuantileRatio;

  })(Ag.DataRequester.Abstract);

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).DataRequester == null) {
    base.DataRequester = {};
  }

  window.Ag.DataRequester.IncomeQuantileRatio = DataRequesterIncomeQuantileRatio;

}).call(this);

(function() {
  var base, createDataRequester;

  createDataRequester = function(chart) {
    var dataRequester, ref, type;
    dataRequester = chart != null ? (ref = chart.config) != null ? ref.dataRequester : void 0 : void 0;
    type = dataRequester != null ? dataRequester.type : void 0;
    if (type == null) {
      return console.error(new Error("Missing data.type in Ag config."));
    }
    switch (type) {
      case "IncomeQuantilesCompare":
        return new Ag.DataRequester.IncomeQuantilesCompare(chart);
      case "IncomeQuantileRatio":
        return new Ag.DataRequester.IncomeQuantileRatio(chart);
    }
  };

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).DataRequester == null) {
    base.DataRequester = {};
  }

  window.Ag.DataRequester.Create = createDataRequester;

}).call(this);

(function() {
  var ChartAbstract, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ChartAbstract = (function() {
    function ChartAbstract(id, config) {
      this.id = id;
      this.config = config;
      this.trigger = bind(this.trigger, this);
      $("#" + this.id).load("/assets/templates/chart.html", null, (function(_this) {
        return function() {
          _this.initUi();
          _this.initDataRequester();
          _this.initObservers();
          _this.initChart();
          return _this.initTriggerListeners();
        };
      })(this));
    }

    ChartAbstract.prototype.initUi = function() {
      var ref;
      if ((ref = this.config.ui) != null ? ref.compareQuantile : void 0) {
        return $.get("/assets/templates/ui/select-compare-quantile.html", (function(_this) {
          return function(html) {
            var ref1, ref2;
            $("#" + _this.id + " .ui").append(html);
            $("#" + _this.id + " .compareQuantile").change(function(event) {
              return _this.react({
                compareQuantile: $(event.currentTarget).text().toUpperCase()
              });
            });
            return _this.react({
              compareQuantile: (ref1 = _this.config.dataRequester) != null ? (ref2 = ref1.query) != null ? ref2.compareQuantile : void 0 : void 0
            });
          };
        })(this));
      }
    };

    ChartAbstract.prototype.initChart = function() {};

    ChartAbstract.prototype.initDataRequester = function() {
      return this.dataRequester = Ag.DataRequester.Create(this);
    };

    ChartAbstract.prototype.initObservers = function() {
      this.observers = {
        title: new PathObserver(this.config, "title"),
        type: new PathObserver(this.config.dataRequester, "type"),
        query: new ObjectObserver(this.config.dataRequester.query),
        ui: new ObjectObserver(this.config.ui)
      };
      this.observers.title.open((function(_this) {
        return function(title, oldTitle) {
          if (title !== oldTitle) {
            return _this.setTitle();
          }
        };
      })(this));
      this.observers.type.open((function(_this) {
        return function(type, oldType) {
          _this.initDataRequester();
          return _this.initChart();
        };
      })(this));
      this.observers.query.open((function(_this) {
        return function(added, removed, changed, getOldValueFn) {
          return _this.update();
        };
      })(this));
      return this.observers.ui.open((function(_this) {
        return function(added, removed, changed, getOldValueFn) {
          return _this.initUi();
        };
      })(this));
    };

    ChartAbstract.prototype.initTriggerListeners = function() {
      return $("#" + this.id).on("query-change", (function(_this) {
        return function(evt, queryUpdate) {
          return _this.react(queryUpdate);
        };
      })(this));
    };

    ChartAbstract.prototype.trigger = function(selectionValue) {
      var queryKey, queryUpdate;
      if (this.config.connect == null) {
        return;
      }
      queryKey = (function() {
        var ref, ref1, ref2;
        switch ((ref = this.config.dataRequester) != null ? (ref1 = ref.query) != null ? (ref2 = ref1.compare) != null ? ref2.toLowerCase() : void 0 : void 0 : void 0) {
          case "race":
            return "compareRace";
          case "sex":
          case "gender":
            return "compareSex";
          case "age":
            return "compareAge";
          case "state":
            return "compareRegion";
        }
      }).call(this);
      queryUpdate = {};
      queryUpdate[queryKey] = selectionValue;
      return $("#" + this.config.connect).trigger("query-change", queryUpdate);
    };

    ChartAbstract.prototype.react = function(queryUpdate) {
      var base, compareQuantile;
      if (queryUpdate == null) {
        return;
      }
      if ((base = this.config.dataRequester).query == null) {
        base.query = {};
      }
      compareQuantile = parseInt(queryUpdate.compareQuantile);
      if (compareQuantile >= 0 && compareQuantile <= 100) {
        this.config.dataRequester.query.compareQuantile = compareQuantile;
        return $("#" + this.id + " .compareQuantile").val(compareQuantile);
      }
    };

    ChartAbstract.prototype.showLoading = function() {
      return $("#" + this.id + " .loading-icon").fadeIn("fast");
    };

    ChartAbstract.prototype.hideLoading = function() {
      return $("#" + this.id + " .loading-icon").fadeOut("fast");
    };

    ChartAbstract.prototype.setTitle = function() {
      var el, ref, state, title;
      el = $("#" + this.id);
      title = (ref = this.config) != null ? ref.title : void 0;
      state = $(".compareRegion option:selected").text();
      title = title.replace("{{state}}", state);
      return el.find(".chart-title").text(title);
    };

    ChartAbstract.prototype.closeObservers = function() {
      var observer, observerKey, ref, results;
      ref = this.observers;
      results = [];
      for (observerKey in ref) {
        observer = ref[observerKey];
        results.push(observer.close());
      }
      return results;
    };

    ChartAbstract.prototype.destroy = function() {
      this.closeObservers();
      this.dataRequester.destroy();
      return $("#" + this.id).html("");
    };

    return ChartAbstract;

  })();

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).Chart == null) {
    base.Chart = {};
  }

  window.Ag.Chart.Abstract = ChartAbstract;

}).call(this);

(function() {
  var ChartBar, base,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ChartBar = (function(superClass) {
    extend(ChartBar, superClass);

    function ChartBar(id, config) {
      this.id = id;
      this.config = config;
      ChartBar.__super__.constructor.call(this, this.id, this.config);
    }

    ChartBar.prototype.initUi = function() {
      var ref, ref1;
      ChartBar.__super__.initUi.call(this);
      if ((ref = this.config.ui) != null ? ref.compare : void 0) {
        $.get("/assets/templates/ui/toggle-compare.html", (function(_this) {
          return function(html) {
            var ref1, ref2;
            $("#" + _this.id + " .ui").append(html);
            $("#" + _this.id + " .compare .toggle").on("click", function(event) {
              return _this.react({
                compare: $(event.target).text().toLowerCase()
              });
            });
            return _this.react({
              compare: (ref1 = _this.config.dataRequester) != null ? (ref2 = ref1.query) != null ? ref2.compare : void 0 : void 0
            });
          };
        })(this));
      }
      if ((ref1 = this.config.ui) != null ? ref1.compareRegion : void 0) {
        return $.get("/assets/templates/ui/select-compare-region.html", (function(_this) {
          return function(html) {
            var ref2, ref3;
            $("#" + _this.id + " .ui").append(html);
            $("#" + _this.id + " .compareRegion").change(function(event) {
              return _this.react({
                compareRegion: $(event.target).text().toUpperCase()
              });
            });
            return _this.react({
              compareRegion: (ref2 = _this.config.dataRequester) != null ? (ref3 = ref2.query) != null ? ref3.compareRegion : void 0 : void 0
            });
          };
        })(this));
      }
    };

    ChartBar.prototype.initChart = function() {
      var bindElement;
      this.showLoading();
      bindElement = "#" + this.id + " .chart";
      return this.dataRequester.fetchData((function(_this) {
        return function(err, data) {
          var xLabel, yLabel;
          xLabel = data.xLabel;
          yLabel = data.yLabel;
          data = _this.translateData(data);
          _this._chart = c3.generate({
            bindto: bindElement,
            data: {
              x: "x",
              columns: data,
              type: "bar",
              onclick: function(d, el) {
                return _this.trigger(d.id);
              }
            },
            bar: {
              width: {
                ratio: 0.7
              }
            },
            axis: {
              x: {
                label: "Percentiles",
                type: "category"
              },
              y: {
                label: yLabel
              }
            },
            color: {
              pattern: ["#0071bc", "#fdb81e", "#02bfe7", "#2e8540", "#e31c3d", "#4c2c92"]
            }
          });
          return _this.hideLoading();
        };
      })(this));
    };

    ChartBar.prototype.update = function() {
      this.showLoading();
      return this.dataRequester.fetchData((function(_this) {
        return function(err, data) {
          data = _this.translateData(data);
          _this._chart.load({
            columns: data,
            unload: _this._chart.columns
          });
          return _this.hideLoading();
        };
      })(this));
    };

    ChartBar.prototype.translateData = function(data) {
      var dataArr, group, labelArr, seriesArr, xLabel;
      if (data.xLabel != null) {
        delete data.xLabel;
      }
      if (data.yLabel != null) {
        delete data.yLabel;
      }
      seriesArr = [];
      for (group in data) {
        labelArr = ["x"];
        dataArr = [group];
        for (xLabel in data[group]) {
          labelArr.push(xLabel);
          dataArr.push(data[group][xLabel]);
        }
        seriesArr.push(dataArr);
      }
      return [labelArr].concat(seriesArr);
    };

    ChartBar.prototype.react = function(queryUpdate) {
      var compare, compareRegion, ref, ref1;
      ChartBar.__super__.react.call(this, queryUpdate);
      compare = (ref = queryUpdate.compare) != null ? ref.toLowerCase() : void 0;
      if (compare === "overall" || compare === "race" || compare === "gender" || compare === "sex" || compare === "age") {
        this.config.dataRequester.query.compare = compare;
        $("#" + this.id + " .compare .toggles li").removeClass("active");
        $("#" + this.id + " .compare .toggles li." + compare).addClass("active");
      }
      compareRegion = (ref1 = queryUpdate.compareRegion) != null ? ref1.toUpperCase() : void 0;
      if (compareRegion != null) {
        this.config.dataRequester.query.compareRegion = compareRegion;
        $("#" + this.id + " .compareRegion").val(compareRegion);
      }
      return this.setTitle();
    };

    return ChartBar;

  })(Ag.Chart.Abstract);

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).Chart == null) {
    base.Chart = {};
  }

  window.Ag.Chart.Bar = ChartBar;

}).call(this);

(function() {
  var ChartMap, base,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  ChartMap = (function(superClass) {
    extend(ChartMap, superClass);

    function ChartMap(id, config) {
      this.id = id;
      this.config = config;
      ChartMap.__super__.constructor.call(this, this.id, this.config);
    }

    ChartMap.prototype.initUi = function() {
      var ref;
      ChartMap.__super__.initUi.call(this);
      if ((ref = this.config.ui) != null ? ref.compare : void 0) {
        return $.get("/assets/templates/ui/toggle-compare-multi.html", (function(_this) {
          return function(html) {
            var ref1, ref2;
            $("#" + _this.id + " .ui").append(html);
            $("#" + _this.id + " #compare .toggles").hide();
            $("#" + _this.id + " #compare .nav").on("click", function(event) {
              var selectedNav;
              $("#" + _this.id + " #compare .nav").removeClass("active");
              $(event.currentTarget).addClass("active");
              $("#" + _this.id + " #compare .toggles").hide();
              selectedNav = $(event.currentTarget).text().toLowerCase();
              if (selectedNav === "overall") {
                return _this.react({
                  compareRace: void 0,
                  compareGender: void 0,
                  compareAge: void 0
                });
              } else {
                return $("#" + _this.id + " #compare .toggles." + selectedNav).show();
              }
            });
            $("#" + _this.id + " #compare .toggle").on("click", function(event) {
              var queryUpdate, selectedNav, selectedTrigger;
              selectedNav = $("#" + _this.id + " #compare .nav.active").text().toLowerCase();
              selectedTrigger = $(event.currentTarget).text().toLowerCase();
              queryUpdate = {
                compareRace: void 0,
                compareGender: void 0,
                compareAge: void 0
              };
              switch (selectedNav) {
                case "race":
                  queryUpdate.compareRace = selectedTrigger;
                  return _this.react(queryUpdate);
                case "gender":
                  queryUpdate.compareGender = selectedTrigger;
                  return _this.react(queryUpdate);
                case "age":
                  queryUpdate.compareAge = selectedTrigger;
                  return _this.react(queryUpdate);
                case "overall":
                  return _this.react(queryUpdate);
              }
            });
            return _this.react({
              compare: (ref1 = _this.config.dataRequester) != null ? (ref2 = ref1.query) != null ? ref2.compare : void 0 : void 0
            });
          };
        })(this));
      }
    };

    ChartMap.prototype.initChart = function() {
      var bindElement;
      this.showLoading();
      bindElement = "#" + this.id + " .chart";
      return this.dataRequester.fetchData((function(_this) {
        return function(err, data) {
          data = _this.translateData(data);
          _this._chart = d3.geomap.choropleth().geofile('/assets/topojson/USA.json').projection(d3.geo.albersUsa).colors(colorbrewer.Midaas[11]).column('Data').unitId('Fips').click(function(d, el) {
            return _this.trigger(d.properties.code);
          }).scale(800).legend(true);
          d3.select(bindElement).datum(data).call(_this._chart.draw, _this._chart);
          return _this.hideLoading();
        };
      })(this));
    };

    ChartMap.prototype.update = function() {
      var bindElement;
      this.showLoading();
      bindElement = "#" + this.id + " .chart";
      return this.dataRequester.fetchData((function(_this) {
        return function(err, data) {
          data = _this.translateData(data);
          _this._chart.data = data;
          _this._chart.update();
          return _this.hideLoading();
        };
      })(this));
    };

    ChartMap.prototype.lookupFips = function(state) {
      return {
        "AL": "01",
        "AK": "02",
        "AZ": "04",
        "AR": "05",
        "CA": "06",
        "CO": "08",
        "CT": "09",
        "DE": "10",
        "DC": "11",
        "FL": "12",
        "GA": "13",
        "HI": "15",
        "ID": "16",
        "IL": "17",
        "IN": "18",
        "IA": "19",
        "KS": "20",
        "KY": "21",
        "LA": "22",
        "ME": "23",
        "MD": "24",
        "MA": "25",
        "MI": "26",
        "MN": "27",
        "MS": "28",
        "MO": "29",
        "MT": "30",
        "NE": "31",
        "NV": "32",
        "NH": "33",
        "NJ": "34",
        "NM": "35",
        "NY": "36",
        "NC": "37",
        "ND": "38",
        "OH": "39",
        "OK": "40",
        "OR": "41",
        "PA": "42",
        "RI": "44",
        "SC": "45",
        "SD": "46",
        "TN": "47",
        "TX": "48",
        "UT": "49",
        "VT": "50",
        "VA": "51",
        "WA": "53",
        "WV": "54",
        "WI": "55",
        "WY": "56",
        "PR": "72"
      }[state];
    };

    ChartMap.prototype.translateData = function(data) {
      var dataArr, fips, group, state;
      if (data.xLabel != null) {
        delete data.xLabel;
      }
      if (data.yLabel != null) {
        delete data.yLabel;
      }
      dataArr = [];
      for (state in data) {
        for (group in data[state]) {
          fips = this.lookupFips(state);
          dataArr.push({
            "State": state,
            "Data": data[state][group],
            "Fips": "US" + fips
          });
        }
      }
      return dataArr;
    };

    ChartMap.prototype.react = function(queryUpdate) {
      var compareAge, compareGender, compareRace, ref, ref1, ref2;
      ChartMap.__super__.react.call(this, queryUpdate);
      compareRace = (ref = queryUpdate.compareRace) != null ? ref.toLowerCase() : void 0;
      if (compareRace === "asian" || compareRace === "black" || compareRace === "hispanic" || compareRace === "white") {
        this.config.dataRequester.query.compareRace = compareRace;
        $("#" + this.id + " #compare .toggles li").removeClass("active");
        $("#" + this.id + " #compare .toggle." + compareRace).addClass("active");
      } else {
        this.config.dataRequester.query.compareRace = void 0;
      }
      compareGender = (ref1 = queryUpdate.compareGender) != null ? ref1.toLowerCase() : void 0;
      if (compareGender === "male" || compareGender === "female") {
        this.config.dataRequester.query.compareGender = compareGender;
        $("#" + this.id + " #compare .toggles li").removeClass("active");
        $("#" + this.id + " #compare .toggle." + compareGender).addClass("active");
      } else {
        this.config.dataRequester.query.compareGender = void 0;
      }
      compareAge = (ref2 = queryUpdate.compareAge) != null ? ref2.toLowerCase() : void 0;
      if (compareAge === "18-24" || compareAge === "25-34" || compareAge === "35-44" || compareAge === "45-54" || compareAge === "55-64" || compareAge === "65+") {
        this.config.dataRequester.query.compareAge = compareAge;
        $("#" + this.id + " #compare .toggles li").removeClass("active");
        $("#" + this.id + " #compare .toggle." + compareAge).addClass("active");
      } else {
        this.config.dataRequester.query.compareAge = void 0;
      }
      return this.setTitle();
    };

    return ChartMap;

  })(Ag.Chart.Abstract);

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).Chart == null) {
    base.Chart = {};
  }

  window.Ag.Chart.Map = ChartMap;

}).call(this);

(function() {
  var base, createChart;

  createChart = function(id, config) {
    switch (config != null ? config.type : void 0) {
      case "bar":
        return new Ag.Chart.Bar(id, config);
      case "map":
        return new Ag.Chart.Map(id, config);
    }
  };

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).Chart == null) {
    base.Chart = {};
  }

  window.Ag.Chart.Create = createChart;

}).call(this);

(function() {
  var Midaas;

  if (window.Ag == null) {
    window.Ag = {};
  }

  Midaas = (function() {
    Midaas.prototype.charts = {};

    Midaas.prototype.observers = {};

    function Midaas() {
      this.initConfig();
      this.createCharts();
    }

    Midaas.prototype.initConfig = function() {
      var config, configParam, ref;
      configParam = $.url("?midaasConfig");
      if (configParam) {
        config = JSON.parse(decodeURIComponent(configParam));
      } else {
        config = (ref = Ag.config) != null ? ref : {};
      }
      return Ag.config = config;
    };

    Midaas.prototype.createChart = function(id, config) {
      Ag.charts[id] = this.charts[id] = Ag.Chart.Create(id, config);
      this.observers["chart_" + id] = new PathObserver(config, "type");
      return this.observers["chart_" + id].open((function(_this) {
        return function(type, oldType) {
          _this.destroyChart(id);
          return _this.createChart(id, Ag.config[id]);
        };
      })(this));
    };

    Midaas.prototype.destroyChart = function(id) {
      this.observers["chart_" + id].close();
      this.charts[id].destroy();
      delete this.charts[id];
      return delete Ag.charts[id];
    };

    Midaas.prototype.createCharts = function() {
      var config, id, ref;
      Ag.charts = this.charts = {};
      ref = Ag.config;
      for (id in ref) {
        config = ref[id];
        this.createChart(id, config);
      }
      this.observers.charts = new ObjectObserver(Ag.config);
      return this.observers.charts.open((function(_this) {
        return function(added, removed, changed, getOldValueFn) {
          Object.keys(added).forEach(function(id) {
            config = added[id];
            return _this.createChart(id, config);
          });
          return Object.keys(removed).forEach(function(id) {
            config = removed[id];
            return _this.destroyChart(id);
          });
        };
      })(this));
    };

    return Midaas;

  })();

  $((function(_this) {
    return function() {
      return new Midaas();
    };
  })(this));

}).call(this);

(function() {
  var WidgetAbstract, base,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  WidgetAbstract = (function() {
    function WidgetAbstract() {
      this.init = bind(this.init, this);
      return null;
    }

    WidgetAbstract.prototype.init = function(el) {
      this.addDestroyListener(el);
      this.addIdsToDrops(el);
      this.enableDragging(el, "#data-menu");
      this.enableDragging(el, "#demographic-menu");
      this.enableDragging(el, "#geographic-menu");
      return this.widgetTitleListener(el);
    };

    WidgetAbstract.prototype.addCreateListener = function(el) {
      return $(".widget-creation .create-button").on("click", (function(_this) {
        return function() {
          $(".widget-creation").removeClass("widget-creation");
          return _this.completeWidget(el);
        };
      })(this));
    };

    WidgetAbstract.prototype.addDestroyListener = function(el) {
      var widgetId;
      widgetId = "#" + el.id;
      return $(widgetId + " .widget-remove").on("click", (function(_this) {
        return function() {
          return _this.destroyWidget(widgetId);
        };
      })(this));
    };

    WidgetAbstract.prototype.addDragClassToBody = function() {
      var body;
      body = document.body;
      return body.className = body.className += " open-widget-attributes";
    };

    WidgetAbstract.prototype.addDragEventListeners = function(drake, dropLocation, menuId, widgetId, validContainerId) {
      return drake.on('drag', (function(_this) {
        return function(el) {
          var dataType;
          dataType = el.getAttribute("data-type");
          _this.addDragClassToBody();
          el.className = el.className.replace('ex-moved', '');
          return $("." + dataType + "-drop").addClass("droppable");
        };
      })(this)).on('drop', (function(_this) {
        return function(el, container) {
          var dataSelection, dataType;
          if ((container != null ? container.id : void 0) === validContainerId) {
            dataType = el.getAttribute("data-type");
            dataSelection = el.textContent.toLowerCase();
            el.className += ' ex-moved';
            container.setAttribute("data-selection", dataSelection);
            console.log("Container:", container);
            _this.removeExistingDrop(dropLocation, el, widgetId, container);
            _this.animateCompletionBar(el, widgetId);
          }
          _this.removeDragClassFromBody();
          return $(".droppable").removeClass("droppable");
        };
      })(this)).on('over', function(el, container) {
        var $widget;
        container.className += ' ex-over';
        if ($("#" + container.id).hasClass("drop")) {
          $widget = $("#" + container.id).closest(".widget");
          return $widget.removeClass("closed");
        }
      }).on('out', function(el, container) {
        var $widget;
        container.className = container.className.replace("ex-over", "");
        $widget = $("#" + container.id).closest(".widget");
        return $widget.addClass("closed");
      });
    };

    WidgetAbstract.prototype.addIdsToDrops = function(el) {
      var widgetId;
      widgetId = "#" + el.id;
      return $(widgetId + " .widget-attributes li").each(function() {
        var dataType;
        dataType = this.getAttribute("data-type");
        return $(this).attr("id", el.id + "-" + dataType + "-drop");
      });
    };

    WidgetAbstract.prototype.animateCompletionBar = function(draggedElement, widgetId) {
      var $bar, completionBarSelector, dataType, dragItem;
      completionBarSelector = widgetId + " .completion-bar";
      dataType = draggedElement.getAttribute("data-type");
      dragItem = widgetId + " ." + dataType + "-drop .drag-item";
      if ($(dragItem).length > 0) {
        switch (dataType) {
          case "data":
            $bar = $(completionBarSelector).find(".data");
            if (!$bar.hasClass("complete")) {
              $bar.addClass("complete");
            }
            break;
          case "demographic":
            $bar = $(completionBarSelector).find(".demographic");
            if (!$bar.hasClass("complete")) {
              $bar.addClass("complete");
            }
            break;
          case "geographic":
            $bar = $(completionBarSelector).find(".geographic");
            if (!$bar.hasClass("complete")) {
              $bar.addClass("complete");
            }
        }
        return this.checkCompleteness(dataType, widgetId);
      }
    };

    WidgetAbstract.prototype.checkCompleteness = function(dataType, widgetId) {
      var dragItem;
      dragItem = widgetId + " .data-drop .drag-item";
      if ($(dragItem).attr("data-dataset") === "quantiles") {
        return this.closeDrawer(widgetId);
      } else if ($(dragItem).attr("data-dataset") === "ratio") {
        if ($(widgetId + " .demographic-drop .drag-item").length > 0) {
          return this.closeDrawer(widgetId);
        } else {
          return this.openDrawer(widgetId);
        }
      }
    };

    WidgetAbstract.prototype.closeDrawer = function(widgetId) {
      return $(widgetId).removeClass("initialized").addClass("closed");
    };

    WidgetAbstract.prototype.completeWidget = function(el) {
      $("#" + el.id + " .widget-content").append("<div id='" + el.id + "-chart'></div>");
      Ag.Widget.editConfigForWidget(el.id);
      return this.disableCreationMode();
    };

    WidgetAbstract.prototype.destroyWidget = function(widgetId) {
      $(widgetId + " .drag-item").unbind();
      $(widgetId).remove();
      return this.disableCreationMode();
    };

    WidgetAbstract.prototype.disableCreationMode = function() {
      $("body").removeClass("creation-mode");
      $("#toolbox-menu").parent().removeClass("disable-menu");
      $(".create-button").remove();
      $(".drag-menu:not(#toolbox-menu").parent().addClass("disable-menu");
      return Ag.Dashboard.creationMode = false;
    };

    WidgetAbstract.prototype.enableCreationMode = function(el) {
      $("body").addClass("creation-mode");
      $("#active-widget-container").addClass("dropped");
      $(".disable-menu").removeClass("disable-menu");
      $("#toolbox-menu").parent().addClass("disable-menu");
      return this.addCreateListener(el);
    };

    WidgetAbstract.prototype.enableDragging = function(el, menuId) {
      var dataMenu, dataType, dropLocation, validContainerId, widgetId;
      widgetId = "#" + el.id;
      dataType = document.querySelector(menuId + " li").getAttribute("data-type");
      dropLocation = document.querySelector(widgetId + "-" + dataType + "-drop");
      dataMenu = document.querySelector(menuId);
      validContainerId = el.id + "-" + dataType + "-drop";
      if ($("#active-widget-container").hasClass("dropped")) {
        window.Ag.Widget.dataDrake.destroy();
        window.Ag.Widget.demographicDrake.destroy();
        window.Ag.Widget.geographicDrake.destroy();
        $("#active-widget-container").removeClass("dropped");
      }
      switch (dataType) {
        case "demographic":
          window.Ag.Widget.demographicDrake = dragula([dataMenu], {
            copy: true
          });
          window.Ag.Widget.demographicDrake.containers.push(dropLocation);
          return this.addDragEventListeners(window.Ag.Widget.demographicDrake, dropLocation, menuId, widgetId, validContainerId);
        case "data":
          window.Ag.Widget.dataDrake = dragula([dataMenu], {
            copy: true
          });
          window.Ag.Widget.dataDrake.containers.push(dropLocation);
          return this.addDragEventListeners(window.Ag.Widget.dataDrake, dropLocation, menuId, widgetId, validContainerId);
        case "geographic":
          window.Ag.Widget.geographicDrake = dragula([dataMenu], {
            copy: true
          });
          window.Ag.Widget.geographicDrake.containers.push(dropLocation);
          this.addDragEventListeners(window.Ag.Widget.geographicDrake, dropLocation, menuId, widgetId, validContainerId);
          $("#active-widget-container").addClass("dropped");
          return this.enableCreationMode(el);
      }
    };

    WidgetAbstract.prototype.openDrawer = function(widgetId) {
      return $(widgetId).removeClass("closed");
    };

    WidgetAbstract.prototype.removeDragClassFromBody = function() {
      return $("body").removeClass("open-widget-attributes");
    };

    WidgetAbstract.prototype.removeExistingDrop = function(dataDrop, el, widgetId, container) {
      var dataType;
      dataType = el.getAttribute("data-type");
      if ($("#" + container.id + " .ex-moved").length > 1) {
        return $("#" + container.id + " .ex-moved:first").remove();
      } else {
        return $("#" + container.id).addClass("cartridge-full");
      }
    };

    WidgetAbstract.prototype.widgetTitleListener = function(el) {
      return $("#" + el.id + " .widget-title").on("blur", function() {
        return $(this).removeClass("editing");
      }).on("focus", function() {
        return $(this).addClass("editing");
      });
    };

    return WidgetAbstract;

  })();

  if (window.Ag == null) {
    window.Ag = {};
  }

  if ((base = window.Ag).Widget == null) {
    base.Widget = {};
  }

  window.Ag.Widget.Abstract = WidgetAbstract;

  window.Ag.Widget.cartridgeDragging = false;

}).call(this);

(function() {
  var WidgetChartBar, base,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  WidgetChartBar = (function(superClass) {
    extend(WidgetChartBar, superClass);

    function WidgetChartBar(el) {
      var template;
      template = "/assets/templates/widget/chart-bar.html";
      $(el).load(template, null, (function(_this) {
        return function() {
          return _this.init(el);
        };
      })(this));
    }

    return WidgetChartBar;

  })(Ag.Widget.Abstract);

  if ((base = window.Ag).Widget == null) {
    base.Widget = {};
  }

  window.Ag.Widget.ChartBar = WidgetChartBar;

}).call(this);

(function() {
  var WidgetChartMap, base,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  WidgetChartMap = (function(superClass) {
    extend(WidgetChartMap, superClass);

    function WidgetChartMap(el) {
      var template;
      template = "/assets/templates/widget/chart-map.html";
      $(el).load(template, null, (function(_this) {
        return function() {
          return _this.init(el);
        };
      })(this));
    }

    return WidgetChartMap;

  })(Ag.Widget.Abstract);

  if ((base = window.Ag).Widget == null) {
    base.Widget = {};
  }

  window.Ag.Widget.ChartMap = WidgetChartMap;

}).call(this);

(function() {
  var base, editConfigForWidget;

  editConfigForWidget = function(widgetId) {
    var chart, chartDataRequester, chartDemographic, chartGeographic, chartId, chartRatio, chartTitle, chartType, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, widget;
    widget = {
      title: (ref = $('#widget-0 input.widget-title')) != null ? ref.val() : void 0,
      type: (ref1 = $("#" + widgetId)) != null ? ref1.attr("data-widget") : void 0,
      data: (ref2 = $("#" + widgetId + "-data-drop")) != null ? ref2.attr("data-selection") : void 0,
      geographic: (ref3 = $("#" + widgetId + "-geographic-drop")) != null ? ref3.attr("data-selection") : void 0,
      demographic: (ref4 = $("#" + widgetId + "-demographic-drop")) != null ? ref4.attr("data-selection") : void 0
    };
    chartId = widgetId + "-chart";
    chartTitle = (ref5 = widget.title) != null ? ref5 : "";
    chartType = {
      "bar-chart": "bar",
      "map": "map"
    }[widget.type];
    if (chartType == null) {
      return;
    }
    chartDataRequester = (ref6 = {
      "quantiles": "IncomeQuantilesCompare",
      "ratios": "IncomeQuantileRatio"
    }[widget.data]) != null ? ref6 : "IncomeQuantilesCompare";
    chartRatio = {
      "gender": ["female", "male"],
      "age": ["25-34", "55-64"],
      "race": ["black", "white"]
    }[widget.demographic];
    chartDemographic = (ref7 = {
      "all": "overall",
      "gender": "sex",
      "age": "age",
      "race": "race"
    }[widget.demographic]) != null ? ref7 : "overall";
    chartGeographic = widget.geographic;
    chart = {
      title: chartTitle,
      type: chartType,
      dataRequester: {
        type: chartDataRequester,
        query: {
          compare: chartDemographic
        }
      },
      ui: {
        compare: false,
        compareRegion: false,
        compareQuantile: false
      }
    };
    if (chart.type === "bar") {
      if (chartGeographic === "state") {
        chart.dataRequester.query.compareRegion = "CA";
        chart.ui.compareRegion = true;
      } else if (chartGeographic === "national") {
        chart.dataRequester.query.compareRegion = "US";
      }
    } else if (chart.type === "map") {
      chart.dataRequester.query.compare = "state";
    }
    if (chart.dataRequester.type === "IncomeQuantileRatio") {
      if (chartRatio != null) {
        chart.dataRequester.query.ratioType = chartDemographic;
        chart.dataRequester.query.ratioNumerator = chartRatio[0];
        chart.dataRequester.query.ratioDenominator = chartRatio[1];
        chart.dataRequester.query.compareQuantile = 50;
      }
    }
    return Ag.config[chartId] = chart;
  };

  if ((base = window.Ag).Widget == null) {
    base.Widget = {};
  }

  window.Ag.Widget.editConfigForWidget = editConfigForWidget;

}).call(this);

(function() {
  var Dashboard, base;

  if (window.Ag == null) {
    window.Ag = {};
  }

  Dashboard = (function() {
    Dashboard.prototype.menuId = "toolbox-menu";

    Dashboard.prototype.containerId = "active-widget-container";

    Dashboard.prototype.widgetCount = 0;

    Dashboard.prototype.addDraggingClass = function() {
      return $("#active-widget-container").addClass("dragging");
    };

    function Dashboard() {
      var ref;
      if (!((ref = $(".pages-dashboard")) != null ? ref.length : void 0)) {
        return;
      }
      this.enableWidgetDragging();
    }

    Dashboard.prototype.enableWidgetDragging = function() {
      var dashContainer, dashContainerWidth, dashMenu;
      dashMenu = document.querySelector("#" + this.menuId);
      dashContainer = document.querySelector("#" + this.containerId);
      dashContainerWidth = dashContainer.offsetWidth + "px";
      this.drake = dragula([dashMenu, dashContainer], {
        copy: true,
        accepts: (function(_this) {
          return function(el, target, source, sibling) {
            return Ag.Dashboard.creationMode === false && target.id === _this.containerId;
          };
        })(this)
      });
      return this.drake.on('drag', (function(_this) {
        return function(el) {
          el.className = el.className.replace('ex-moved', '');
          return $(".gu-mirror").attr("width", dashContainerWidth);
        };
      })(this)).on('drop', (function(_this) {
        return function(el, target, source, sibling) {
          if ((target != null ? target.id : void 0) !== _this.containerId) {
            return;
          }
          el.id = "widget-" + _this.widgetCount;
          el.className += ' ex-moved widget widget-creation';
          setTimeout(function() {
            return el.className += " initialized";
          }, 30);
          _this.initWidget(el);
          _this.widgetCount++;
          return Ag.Dashboard.creationMode = true;
        };
      })(this)).on("moves", function(el) {
        return false;
      }).on('over', function(el, container) {
        return container.className += ' ex-over';
      }).on('out', function(el, container) {
        return container.className = container.className.replace('ex-over', '');
      });
    };

    Dashboard.prototype.initWidget = function(el) {
      var widgetType;
      widgetType = el.getAttribute("data-widget");
      switch (widgetType) {
        case "bar-chart":
          return new Ag.Widget.ChartBar(el);
        case "map":
          return new Ag.Widget.ChartMap(el);
      }
    };

    Dashboard.prototype.removeDraggingClass = function() {
      return $("#active-widget-container").removeClass("dragging");
    };

    Dashboard.prototype.widgetTitleListener = function() {
      return $(".widget-title").on("blur", function() {
        return this.removeClass("editing");
      });
    };

    return Dashboard;

  })();

  $(function() {
    return new Dashboard();
  });

  if ((base = window.Ag).Dashboard == null) {
    base.Dashboard = {};
  }

  window.Ag.Dashboard.creationMode = false;

}).call(this);
