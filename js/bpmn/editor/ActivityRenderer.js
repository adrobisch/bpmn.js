define([], function () {
  var ActivityRenderer = function (renderer) {

    this.markerPaths = {
      "serviceTask" : 'm 14.867748,9.688475 c 0.280053,0 0.540605,-0.235339 0.578706,-0.522905 0,0 0.05355,-0.404146 0.05355,-0.884769 0,-0.480624 -0.05355,-0.884771 -0.05355,-0.884771 -0.03823,-0.28772 -0.298653,-0.522904 -0.578706,-0.522904 h -1.447215 c -0.280203,0 -0.571206,-0.18513 -0.646506,-0.411297 -0.0753,-0.226167 -0.178952,-0.951766 0.0192,-1.156948 l 1.023009,-1.060108 c 0.198001,-0.205338 0.213301,-0.555702 0.0339,-0.77876 L 12.646525,2.218443 C 12.431273,2.032379 12.093319,2.048234 11.895017,2.253573 L 10.872008,3.313681 C 10.674005,3.519021 10.343852,3.601716 10.138799,3.49757 9.9335984,3.393425 9.3586419,2.954148 9.3586419,2.663784 V 1.1640891 c 0,-0.29036388 -0.227102,-0.56020928 -0.5046052,-0.59984728 0,0 -0.3900032,-0.055653 -0.8538078,-0.055653 -0.463806,0 -0.8538092,0.055653 -0.8538092,0.055653 C 6.868767,0.60372312 6.6416649,0.87372522 6.6416649,1.1640891 V 2.663784 c 0,0.290364 -0.1785017,0.591765 -0.3969041,0.669951 C 6.0263585,3.411765 5.3263015,3.519177 5.1281493,3.313845 L 4.1051389,2.253728 C 3.9069868,2.04839 3.5688835,2.032535 3.3537816,2.218442 L 2.1500193,3.465857 c -0.179552,0.223058 -0.1642519,0.573422 0.033898,0.77876 L 3.2067775,5.304725 C 3.4049297,5.510063 3.4848802,5.852033 3.3842297,6.064521 3.2835793,6.277009 2.8598246,6.87297 2.5796218,6.87297 H 1.1325571 c -0.2802027,0 -0.54060564,0.235339 -0.57885593,0.522904 0,0 -0.0537012,0.404147 -0.0537012,0.88477 0,0.480779 0.0537012,0.88477 0.0537012,0.88477 0.0380982,0.287721 0.29865323,0.522904 0.57885593,0.522904 h 1.4472148 c 0.2802028,0 0.5710558,0.184976 0.6463564,0.411299 0.075301,0.226165 0.1789517,0.951609 -0.019201,1.156947 L 2.184067,12.316517 c -0.1981522,0.205337 -0.2134522,0.555702 -0.033898,0.77876 l 1.2036123,1.24757 c 0.2152519,0.185908 0.5532051,0.170209 0.7513572,-0.03514 l 1.0230111,-1.060103 c 0.1981514,-0.205185 0.5281549,-0.288035 0.7333572,-0.183889 0.2052015,0.104146 0.7801577,0.543423 0.7801577,0.833786 V 15.3972 c 0,0.29021 0.2271024,0.56021 0.5047551,0.599692 0,0 0.3898537,0.05549 0.8538092,0.05549 0.4639541,0 0.8538078,-0.05549 0.8538078,-0.05549 0.2776533,-0.03963 0.5046052,-0.309482 0.5046052,-0.599691 v -1.499692 c 0,-0.290364 0.1785024,-0.59192 0.3969045,-0.669951 0.2184021,-0.07803 0.9184587,-0.185287 1.1166107,0.01989 l 1.022859,1.060109 c 0.198152,0.205183 0.536256,0.221037 0.751509,0.03514 l 1.203613,-1.247104 c 0.179402,-0.223059 0.164251,-0.573266 -0.03405,-0.778759 l -1.022859,-1.059949 c -0.198153,-0.205337 -0.278104,-0.547307 -0.177453,-0.75995 0.100501,-0.212644 0.524406,-0.80845 0.804608,-0.80845 h 1.447365 z m -6.8676686,1.437052 c -1.5162163,0 -2.7453284,-1.273528 -2.7453284,-2.844882 0,-1.571043 1.2291121,-2.844882 2.7453284,-2.844882 1.5162152,0 2.7453276,1.273683 2.7453276,2.844882 0,1.571198 -1.2291124,2.844882 -2.7453276,2.844882 z',
      "userTask" : 'M 7.6955681,7.542161 C 7.3167492,6.843663 6.852991,6.278031 6.3879925,5.882595 5.8454944,6.288155 5.1845767,6.534907 4.4641391,6.534907 3.7424616,6.534907 3.0809239,6.287522 2.5390458,5.882595 2.0740474,6.278031 1.610289,6.843663 1.2302303,7.542161 0.34859343,9.163766 0.25187377,10.827129 1.0132311,11.258629 c 0.3409988,0.194238 0.6987376,0.04935 1.0682563,-0.313818 -0.0651,0.36823 -0.1029196,0.767462 -0.1029196,1.185042 0,1.85507 0.7061775,3.357728 1.5766545,3.357728 0.5245182,0 0.7842973,-0.547284 0.9089168,-1.384976 0.1246196,0.837692 0.3843987,1.384976 0.9070569,1.384976 0.8717169,0 1.5778946,-1.502658 1.5778946,-3.357728 0,-0.41758 -0.037821,-0.816812 -0.1041598,-1.185042 0.3707588,0.363168 0.7278777,0.508056 1.0694965,0.313818 0.761357,-0.4315 0.6627773,-2.094863 -0.2188592,-3.716468 z M 4.4635192,5.902209 c 1.4644349,0 2.652351,-1.212249 2.652351,-2.707314 0,-1.495065 -1.1879161,-2.70731418 -2.652351,-2.70731418 -1.4650549,0 -2.6535908,1.21224918 -2.6535908,2.70731418 0,1.495065 1.1885359,2.707314 2.6535908,2.707314 z',
      "businessRuleTask" : 'm -6.6775,-6.4391075 v 1.7073217 H 6.3224105 V -6.4391075 H -6.6775 z m 0,9.2357054 H 6.3224105 V 1.0892767 H -6.6775 v 1.7073212 z m 0,-3.76419196 H 6.3224105 V -2.6749155 H -6.6775 v 1.70732144 z m 0,7.52781506 H 6.3224105 V 4.8528994 H -6.6775 V 6.560221 z',
      "receiveTask" : 'm 6.612092,-4.0112852 -12.2876956,0.048953 -1.1259638,0 0.8811885,0.7098496 3.2310263,2.54565661 L -6.2385858,-3.3748709 -6.875,-3.839943 l 0,0.7832793 0,8.6650229 L -6.875,6 -6.4833605,6 7.395362,6 7.787,6 l 0,-0.3916408 0,-8.6650229 0,-0.7832793 -0.636423,0.4650721 -3.891903,2.93729731 3.598184,-2.86386481 0.881186,-0.7098468 -1.125952,0 z M 5.510602,-3.228006 0.44376231,0.78629811 -4.54964,-3.1790514 5.510602,-3.2280057 z m -11.6023227,0.9546218 6.31518591,4.7241513 0.2447763,0.1713424 0.220297,-0.1713424 6.31519149,-4.7241513 0,7.4901076 -13.0954507,0 0,-7.4901076 z'
    };

    this.createRectangle = function (bounds) {
      var cornerRadius = renderer.skin()["activity_corner_radius"];

      return renderer.canvas.createRect({
        left: 0,
        top: 0,
        width: bounds.width(),
        height: bounds.height(),
        cornerRadius : cornerRadius,
        stroke: renderer.skin()["activity_stroke"],
        fill: renderer.skin()["activity_fill"],
        strokeWidth: 2
      });
    };

    this.getPathForActivityType = function (activity) {
      return this.markerPaths[activity.tag];
    };

    this.createMarker = function (pathForType) {
      var activityMarker = renderer.canvas.createPath({
        x: 0,
        y: 0,
        data: pathForType,
        stroke: renderer.skin()["activity_stroke"],
        fill: renderer.skin()["activity_fill"]
      });
      return activityMarker;
    };

    this.render = function (activity, group) {
      var bounds = activity.getBounds();

      var rect = this.createRectangle(bounds);
      group.add(rect);

      var pathForType = this.getPathForActivityType(activity);

      if (pathForType) {
        var activityMarker = this.createMarker(pathForType);
        group.add(activityMarker);
      }

      return group;
    };

  };
  return ActivityRenderer;
});