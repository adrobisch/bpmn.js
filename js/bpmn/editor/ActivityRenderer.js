define([], function () {
  var ActivityRenderer = function (renderer) {

    this.markerPaths = {
      "bpmn.ServiceTask" : 'm 22.701284,14.663851 c 0.432742,0 0.835353,-0.363368 0.894226,-0.807377 0,0 0.08274,-0.624013 0.08274,-1.366108 0,-0.742094 -0.08274,-1.366107 -0.08274,-1.366107 -0.05909,-0.444249 -0.461484,-0.807376 -0.894226,-0.807376 h -2.236261 c -0.432975,0 -0.882637,-0.285846 -0.998992,-0.6350536 -0.116355,-0.3492066 -0.276519,-1.4695496 0.02967,-1.7863558 L 21.076473,6.2586397 C 21.382428,5.9415935 21.40607,5.4006221 21.128856,5.0562152 L 19.269014,3.1299359 C 18.936402,2.8426498 18.414191,2.8671302 18.107771,3.1841824 L 16.526998,4.8210152 C 16.221042,5.1380613 15.710883,5.2657441 15.394032,5.1049407 15.076952,4.9441373 14.18852,4.2658838 14.18852,3.8175543 V 1.501988 c 0,-0.4483294 -0.350922,-0.86497745 -0.779725,-0.92617905 0,0 -0.60264,-0.085927 -1.319319,-0.085927 -0.716679,0 -1.319319,0.085927 -1.319319,0.085927 -0.429034,0.06096 -0.7799559,0.47784965 -0.7799559,0.92617905 v 2.3155663 c 0,0.4483295 -0.275824,0.9136994 -0.6133031,1.0344211 C 9.0394192,4.9724583 7.9576789,5.1383013 7.6514912,4.8212576 L 6.0707181,3.1844175 C 5.7645304,2.8673702 5.2420872,2.8428899 4.9097076,3.1299359 L 3.0496339,5.0559751 C 2.7721873,5.4003821 2.7958294,5.9413535 3.1020167,6.2583996 L 4.682558,7.8952336 C 4.9887458,8.2122798 5.1122872,8.7402903 4.9567595,9.0683769 4.8012323,9.3964637 4.14644,10.316643 3.7134658,10.316643 H 1.4774369 c -0.4329742,0 -0.83535274,0.363367 -0.89445788,0.807376 0,0 -0.082979,0.624013 -0.082979,1.366107 0,0.742335 0.082979,1.366108 0.082979,1.366108 0.0588733,0.444249 0.46148368,0.807376 0.89445788,0.807376 h 2.2362607 c 0.4329742,0 0.882405,0.285607 0.9987611,0.635054 0.116356,0.349206 0.2765193,1.46931 -0.029668,1.786356 l -1.5805412,1.636594 c -0.3061877,0.317046 -0.3298298,0.858017 -0.052384,1.202424 l 1.859842,1.926279 c 0.3326113,0.287047 0.8548228,0.262806 1.1610105,-0.05425 l 1.5807733,-1.636829 c 0.3061877,-0.316806 0.8161146,-0.444729 1.1331963,-0.283925 0.3170817,0.160802 1.2055136,0.839057 1.2055136,1.287386 v 2.315567 c 0,0.448089 0.3509218,0.864976 0.7799558,0.925938 0,0 0.602408,0.08568 1.319319,0.08568 0.71691,0 1.319319,-0.08568 1.319319,-0.08568 0.429035,-0.06119 0.779725,-0.477849 0.779725,-0.925938 v -2.315567 c 0,-0.448329 0.275825,-0.913939 0.613303,-1.034421 0.337479,-0.120482 1.419219,-0.286086 1.725407,0.03071 l 1.580541,1.636833 c 0.306188,0.316807 0.828631,0.341288 1.161243,0.05425 l 1.859842,-1.925559 c 0.277214,-0.344407 0.253804,-0.885138 -0.05262,-1.202424 l -1.58054,-1.636586 c -0.306188,-0.317046 -0.42973,-0.845056 -0.274202,-1.173383 0.155296,-0.328327 0.81032,-1.248266 1.243294,-1.248266 h 2.236492 z m -10.612039,2.218844 c -2.342882,0 -4.2421275,-1.966359 -4.2421275,-4.392569 0,-2.425728 1.8992455,-4.3925682 4.2421275,-4.3925682 2.342882,0 4.242127,1.9666002 4.242127,4.3925682 0,2.42597 -1.899245,4.392569 -4.242127,4.392569 z',
      "bpmn.UserTask" : 'M 12.253681,11.77491 C 11.634895,10.657313 10.877364,9.7523027 10.117807,9.1196049 9.2316574,9.7684998 8.152074,10.163303 6.9752673,10.163303 5.7964351,10.163303 4.715839,9.7674875 3.8307021,9.1196049 3.0711453,9.7523027 2.313614,10.657313 1.6928029,11.77491 c -1.44011956,2.594568 -1.59810737,5.255948 -0.3544598,5.946348 0.5570083,0.310781 1.1413607,0.07896 1.7449552,-0.502109 -0.106338,0.589168 -0.1681153,1.22794 -0.1681153,1.896068 0,2.968112 1.1535136,5.372364 2.5754039,5.372364 0.8567801,0 1.2811192,-0.875654 1.4846804,-2.215961 0.2035612,1.340307 0.6279003,2.215961 1.4816421,2.215961 1.4239158,0 2.5774296,-2.404252 2.5774296,-5.372364 0,-0.668128 -0.06178,-1.3069 -0.170141,-1.896068 0.60562,0.581069 1.18896,0.81289 1.746981,0.502109 1.243647,-0.6904 1.082621,-3.35178 -0.357498,-5.946348 z M 6.9742546,9.1509867 c 2.3920975,0 4.3325124,-1.9395984 4.3325124,-4.3317023 0,-2.3921039 -1.9404149,-4.33170228 -4.3325124,-4.33170228 -2.3931103,0 -4.3345375,1.93959838 -4.3345375,4.33170228 0,2.3921039 1.9414272,4.3317023 4.3345375,4.3317023 z',
      "bpmn.BusinessRuleTask" : 'M 0.49999997,0.68485673 V 3.8369982 H 24.501049 V 0.68485673 H 0.49999997 z m 0,17.05141427 H 24.501049 V 14.58413 H 0.49999997 v 3.152141 z m 0,-6.949637 H 24.501049 V 7.6344932 H 0.49999997 v 3.1521408 z m 0,13.898223 H 24.501049 V 21.532715 H 0.49999997 v 3.152142 z',
      "bpmn.ReceiveTask" : 'M 1.7164479,0.59270005 9.5482144,6.784475 17.408905,0.54332386 z M 0.70000001,1.254341 l 0,11.06027 17.69642899,0 0,-11.06027 -8.8482146,6.6361608 z'
    };

    this.createRectangle = function (bounds) {
      var cornerRadius = renderer.skin()["activity_corner_radius"];

      var rect = renderer.canvas.createRect({
        width: bounds.width(),
        height: bounds.height(),
        "cornerRadius": cornerRadius,
        stroke: renderer.skin()["activity_stroke"],
        fill: renderer.skin()["activity_fill"],
        strokeWidth: 2
      });
      return rect;
    };

    this.getPathForActivityType = function (activity) {
      return this.markerPaths[activity.declaredClass];
    };

    this.createMarker = function (pathForType) {
      var activityMarker = renderer.canvas.createPath({
        x: 3,
        y: 3,
        data: pathForType,
        stroke: renderer.skin()["activity_stroke"],
        fill: renderer.skin()["activity_fill"],
        scale: 0.6
      });
      return activityMarker;
    };

    this.render = function (activity, group) {
      var bounds = activity.getBounds();

      var rect = this.createRectangle(bounds);
      var pathForType = this.getPathForActivityType(activity);
      var activityMarker = this.createMarker(pathForType);

      group.add(rect);
      group.add(activityMarker);

      return group;
    };

  };
  return ActivityRenderer;
});