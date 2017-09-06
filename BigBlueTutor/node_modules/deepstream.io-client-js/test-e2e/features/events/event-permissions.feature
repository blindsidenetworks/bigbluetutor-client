@events @permissions
Feature: Event publishing and subscribing
  Events are deepstream's publish-subscribe
  pattern.

  Background:
    Given "complex" permissions are used
      And client A connects and logs into server 1
      And client B connects and logs into server 2

  Scenario: Clients subscribe to open events
    Given client A subscribes to an event "open/some-event"
    When client B publishes an event "open/some-event" with data "someData"
    Then client A receives the event "open/some-event" with data "someData"

  Scenario: Clients can be prevents from subscribing and publishing
    Given client A subscribes to an event "forbidden/some-event"
    When client B publishes an event "forbidden/some-event" with data 44

    Then client A receives "EVENT" error "MESSAGE_DENIED"
      And client B receives "EVENT" error "MESSAGE_DENIED"

  Scenario: Allows only subscribing or publishing
    Given client B subscribes to an event "a-to-b/some-event"
    When client A publishes an event "a-to-b/some-event" with data "someData"
    Then client B receives the event "a-to-b/some-event" with data "someData"

  Scenario: Prevents only subscribing or publishing
    Given client A subscribes to an event "a-to-b/some-event"
    When client B publishes an event "a-to-b/some-event" with data "someData"
    Then client A receives "EVENT" error "MESSAGE_DENIED"
      And client B receives "EVENT" error "MESSAGE_DENIED"

  Scenario: Prevents news about regular pigs
    When client A publishes an event "news/regular-pigs"
    Then client A receives "EVENT" error "MESSAGE_DENIED"

  Scenario: Allows news about tea cup pigs
    When client A publishes an event "news/tea-cup-pigs"
    Then client A received no errors

  Scenario: Does not allow numbers less than 10
    When client A publishes an event "number"
    Then client A receives "EVENT" error "MESSAGE_DENIED"

  Scenario: Allows numbers greater than 10
    When client A publishes an event "number" with data "12"
    Then client A received no errors

  Scenario: Allows places in berlin
    When client A publishes an event "place/berlin" with data { "address": {"city": "Berlin"} }
    Then client A received no errors

  Scenario: Prevents places in berlin
    When client A publishes an event "place/munich" with data { "address": {"city": "Berlin"} }
    Then client A receives "EVENT" error "MESSAGE_DENIED"
