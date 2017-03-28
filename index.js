'use strict'
var Alexa = require("alexa-sdk");
var APP_ID = '';
var facts = require('./intro-facts.json');

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(startSessionHandlers, InfoCollectorHandlers);
    alexa.execute();
};

var startSessionHandlers = {
    'LaunchRequest': function() {
        this.emit(':askWithCard', 'Hello, ask for a Minecraft Trivia fact');
    },
    'AMAZON.HelpIntent': function() {
        this.emit(':ask', 'This skill will return a Minecraft Trivia fact. Ask Minecraft Trivia to tell you a fact', 'Ask Minecraft Trivia to tell you a fact.');
    },
    'AMAZON.StopIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    }
}

var InfoCollectorHandlers = {
    'TriviaIntent': function() {
        var randomId = Math.floor(Math.random() * 15)
        var randomFact = facts[randomId]
        this.emit(':tell', randomFact.fact);
    },
    'AMAZON.CancelIntent': function() {
        this.emit(':tell', "Goodbye!");
    },
    'SessionEndedRequest': function() {
        console.log('session ended!');
        this.emit(":tell", "Goodbye!");
    },
    'Unhandled': function() {
        console.log("UNHANDLED");
        this.emit(':ask', 'Sorry, I didn\'t get that. Try asking for minecraft trivia or fact.', 'Try asking for minecraft trivia or fact.');
    }
}
