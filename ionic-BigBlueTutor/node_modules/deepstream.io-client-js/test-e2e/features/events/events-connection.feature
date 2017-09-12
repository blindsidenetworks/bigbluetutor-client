@events
Feature: Events Connectivity
  Events subscriptions must be resent to the
  server after connection issues to guarantee
  it continues recieving them correctly.

  This applies to both subscribing to events
  and listening to event subscriptions.

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3

  Scenario: All subscriptions should be resumed after servers restart
    Given all clients subscribe to an event "bob"

    When server 1 goes down
      And server 2 goes down
      And server 3 goes down
      And server 1 comes back up
      And server 2 comes back up
      And server 3 comes back up

    Then all clients receive at least one "CONNECTION" error "CONNECTION_ERROR"

    When client A publishes an event "bob"
    Then all clients receive the event "bob"

  Scenario: Server restarts
    Given all clients subscribe to an event "eve"

    When client A publishes an event "eve"
    Then all clients receive the event "eve"

    When server 1 goes down
      And client A publishes an event "eve"

    Then client A receives the event "eve"
      But client B receives no event "eve"
      And client C receives no event "eve"
      And client D receives no event "eve"

    When server 1 comes back up

    Then client A receives at least one "CONNECTION" error "CONNECTION_ERROR"
      And client B receives at least one "CONNECTION" error "CONNECTION_ERROR"
      And client C receives the event "eve"
      And client D receives the event "eve"
      # B might not recieve the event because there is a race condition
      # between A publishing the event and B resubscribing


