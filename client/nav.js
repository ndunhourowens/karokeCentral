import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import './nav.html';

Template.nav.onCreated( function() {

});

Template.nav.rendered = function(){
    if(Meteor.users.find().count() === 0){
        $('#settingLI').hide();
    }

    var something = window.document.getElementById('something');

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(something);

    // listen to events...
    mc.on("panright", function(ev) {
    Router.go('/playList');
    });

    mc.on("panleft", function(ev) {
    Router.go('/userDash');
    });
};


Template.nav.helpers({
    user: function(){
        if(Meteor.users.find().count() === 0){
            return '/userDash';
        }else{
            return '/adminDash/' + Meteor.userId();
        }
    }

});

Template.nav.events({
    'click #logOut': function(e){
        event.preventDefault();
        Meteor.logout();
        Router.go('/');
    },
});