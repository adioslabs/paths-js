define(["exports", "module", "./geom"], function (exports, module, _geom) {
  "use strict";

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  var _Geom = _interopRequireDefault(_geom);

  function Event(arcSiteOrNodes, eventCoord, vertexCoord) {
    if (arcSiteOrNodes.length == 2) {
      this.coord = arcSiteOrNodes;
    } else {
      this.arcsNodes = [arcSiteOrNodes[0], arcSiteOrNodes[2], arcSiteOrNodes[4]];
      this.edgesNodes = [arcSiteOrNodes[1], arcSiteOrNodes[3]];
      this.vertexCoord = vertexCoord;
      this.coord = eventCoord;
    }

    Event.prototype.goToEventIndex = function (es, approx) {
      approx = approx || 1e-10;
      var i = 0;
      while (i < es.length && this.coord[1] > es[i].coord[1] + approx) i++;
      return i;
    };

    Event.prototype.add = function (es) {
      es.splice(this.goToEventIndex(es), 0, this);
    };

    Event.prototype.rm = function (es) {
      var i = this.goToEventIndex(es);
      while (i < es.length) {
        if (i == es.length - 1 || this.coord[1] != es[i + 1].coord[1] || this.arcsNodes == es[i].arcsNodes && this.coord[0] === es[i].coord[0] && this.coord[1] === es[i].coord[1]) return es.splice(i, 1);
        i++;
      };
      console.log("Event does not exist in list");
    };

    //------------------------------------------------------------------------
    Event.prototype.toString = function () {
      return this.edgesNodes ? "Circle event. Vertex: " + this.vertexCoord + "; coord:" + this.coord : "Site event. Coord:" + this.coord;
    };
  }

  module.exports = Event;
});