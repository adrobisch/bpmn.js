define(["bpmn/execution/TokenStore", "dojo/_base/declare", "dojo/_base/array", "dojo/_base/lang", "dojo/Deferred", "dojo/topic"], function (TokenStore, declare, array, l, Deferred, topic) {

  var instance = {

    constructor : function (definitions, configuration, tokenMap, variables) {
      this.definitions = definitions;
      this.configuration = configuration;
      this.tokenStore = new TokenStore(tokenMap);
      this.variables = variables ? variables : {};

      this.behaviours["bpmn.StartEvent"] = this.behaviours["takeAll"];
      this.behaviours["bpmn.EndEvent"] = this.behaviours["takeNone"];
      this.behaviours["bpmn.UserTask"] = this.behaviours["takeNone"];
      this.behaviours["bpmn.ServiceTask"] = this.behaviours["takeAll"];
      this.behaviours["bpmn.ExclusiveGateway"] = this.behaviours["xor"];
      this.behaviours["bpmn.ParallelGateway"] = this.behaviours["and"];
    },

    behaviours : {

      "takeAll" : function (element) {
        this.dropToken(element.id(), this.tokenStore);
        return element.outgoing();
      },

      "takeNone" : function (element) {
        return [];
      },

      "xor" :  function (element) {
        this.dropToken(element.id(), this.tokenStore);

        // merge gateway
        if (element.outgoing().length == 1) {
          return element.outgoing();
        }

        var transition = null;

        array.map(element.outgoing(), function (outgoing) {
          var flowConfig = this.configuration[outgoing.id()];

          if (!transition && flowConfig && flowConfig(this)) {
            transition = outgoing;
          }

        }, this);

        if (!transition && !element.getDefault()) {
          throw new Error("No transition evaluated to true and no default defined");
        }

        return transition;
      },

      "and" :  function (element) {
        var isActive = true;
        var tokens = this.tokenStore.query(element.id());
        var fromMap = {};

        if (element.incoming().length == 1) {
          return l.hitch(this, this.behaviours.takeAll)(element);
        }

        for (var index = 0; index < tokens.length; index++) {
          var token = tokens[index];
          fromMap[token.from] = token;
        }

        var activeTransitions = [];

        array.map(element.incoming(), function (incoming) {

          if (!fromMap[incoming.id()]) {
            isActive = false;
          } else {
            activeTransitions.push(incoming);
          }

        }, this);

        if (isActive) {
          array.map(activeTransitions, function (t) {
            l.hitch(this, this.dropToken)(t.sourceRef(), this.tokenStore);
          }, this);

          return l.hitch(this, this.behaviours.takeAll)(element);
        }else {
          return [];
        }

      }
    },

    dropToken : function (id, tokenStore, count) {
      if (tokenStore.query(id).length > 0) {
        tokenStore.drop(id, count ? count : 1);
      }
    },

    copyVariables : function (variables) {
      if (variables) {
        for (var index in variables) {
          this.variables[index] = variables[index];
        }
      }
    },

    start : function (startId, variables) {
      this.tokenStore.add(startId, {from : null});
      return this.trigger(startId, variables);
    },

    trigger : function (elementId, variables, behaviour, path) {
      console.log("trigger", elementId);

      var deferred = new Deferred();
      var path = path ? path : new Deferred();

      this.copyVariables(variables);

      var node = this.definitions.index.item(elementId);
      var nodeBehaviour = behaviour ? this.behaviours[behaviour] : this.behaviours[node.declaredClass];

      var transitions = [].concat(l.hitch(this, nodeBehaviour) (node, this.tokenStore) );
      console.log("next", transitions);

      if (transitions.length > 0 && this.configuration.leave) {
        this.configuration.leave(node);
        topic.publish("flow:leave:"+node.id(), node);
      }

      if (transitions.length == 0) {
        path.resolve();
      }

      transitions.map(function (transition) {
        this.tokenStore.add(transition.targetRef(), {from : transition.id()});

        var pubPath = "flow:enter:"+transition.targetRef();
        topic.publish(pubPath, transition.getTargetRef());

        if (this.configuration.enter) {
          this.configuration.enter(transition.getTargetRef());
        }

        var self = this;
        deferred.then(function () {
          console.log("then for", transition.id());
          self.trigger(transition.targetRef(), null, null, path);
        });
      }, this);

      if (this.configuration[elementId] && this.configuration[elementId]) {
        this.configuration[elementId]({instance : this, promise : deferred});
      }else {
        console.log("resolving", elementId, this.tokenStore.tokenMap);
        deferred.resolve();
      }

      return path;
    }

  };

  return declare("bpmn.Instance", null, instance);
});