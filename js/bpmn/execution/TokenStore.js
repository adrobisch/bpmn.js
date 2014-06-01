define(["bpmn/util/JSClass"], function (jsclass) {

  var tokenStore = {

    constructor : function (tokenMap) {
      this.tokenMap = tokenMap ? tokenMap : {};
    },

    add : function (id, token) {
      if (!this.tokenMap[id]) {
        this.tokenMap[id] = [];
      }
      this.tokenMap[id].push(token);
    },

    drop : function (id, count) {
      if (this.tokenMap[id]) {
        for (var c = 0; c < count; c++) {
          this.tokenMap[id].pop();
        }
      }
    },

    query : function (id) {
      return this.tokenMap[id] ? this.tokenMap[id] : [];
    },

    count : function () {
      var result = 0;
      for (var key in this.tokenMap) {
        result += this.tokenMap[key].length;
      }
      return result;
    }

  };

  return new jsclass.Class(tokenStore);
});