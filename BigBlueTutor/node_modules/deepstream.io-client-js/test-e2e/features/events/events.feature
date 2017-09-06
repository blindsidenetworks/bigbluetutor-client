@events
Feature: Event publishing and subscribing
  Events are deepstream's publish-subscribe
  pattern.

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3

  Scenario: Clients receive events they are subscribed to
    Given all clients subscribe to an event "event1"

    When client A publishes an event "event1" with data "someData"

    Then all clients receives the event "event1" with data "someData"

  Scenario: Client subscribes and unsubscribes
    Given client A subscribes to an event "event3"
      And client B subscribes to an event "event3"

    When client B publishes an event "event3" with data {"an": "object"}

    Then client A receives the event "event3" with data {"an": "object"}
      And client B receives the event "event3" with data {"an": "object"}

    When client A unsubscribes from an event "event3"
      And client A publishes an event "event3" with data "someOtherData"

    Then client A receives no event "event3"
      But client B receives the event "event3" with data "someOtherData"

  Scenario: Multiple events are received by all subscribers
    Given all clients subscribe to an event "event4"

    When client A publishes an event "event4" with data 100
    Then all clients receive the event "event4" with data 100

    When client B publishes an event "event4" with data 101
    Then all clients receive the event "event4" with data 101

    When client C publishes an event "event4" with data 102
    Then all clients receive the event "event4" with data 102

    When client D publishes an event "event4" with data 103
    Then all clients receive the event "event4" with data 103
