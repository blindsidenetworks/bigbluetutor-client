@records
Feature: Record

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3
      And all clients get the record "record"
      And client A sets the record "record" with data '{ "user": { "firstname": "John" } }'

  Scenario: Maintains a local copy of the record
    Then all clients have record "record" with path "user.firstname" and data 'John'

  Scenario: Settings a records path
    When client A sets the record "record" and path "user.firstname" with data 'Bob'
    Then all clients have record "record" with path "user.firstname" and data 'Bob'

  Scenario: Subscribes to full record
    Given all clients subscribe to record "record" with immediate flag
    Then all clients receive an update for record "record" with data '{ "user": { "firstname": "John" } }'

    When client A sets the record "record" and path "user.firstname" with data 'Dave'

    Then all clients receive an update for record "record" with data '{ "user": { "firstname": "Dave" } }'

  Scenario: Subscribes to record path
    Given all clients subscribe to record "record" with path "user.firstname" with immediate flag
    Then all clients receive an update for record "record" and path "user.firstname" with data 'John'

    When client A sets the record "record" and path "user.firstname" with data 'Dave'

    Then all clients receive an update for record "record" and path "user.firstname" with data 'Dave'

  Scenario: Subscribes and unsubscribes
    Given all clients subscribe to record "record" with path "pets[2]"

    When client A sets the record "record" and path "pets[2]" with data 'Samoyed'
    Then all clients receive an update for record "record" and path "pets[2]" with data 'Samoyed'

    When all clients unsubscribe to record "record" with path "pets[2]"
      And client B sets the record "record" and path "pets[2]" with data 'Guineapig'

    Then all clients don't receive an update for record "record" and path "pets[2]"

  Scenario: Subscribes and Discards
    Given all clients subscribe to record "record" with path "city"

    When client A sets the record "record" and path "city" with data 'Berlin'
    Then all clients receive an update for record "record" and path "city" with data 'Berlin'

    When client A discards record "record"
      And client B sets the record "record" and path "city" with data 'Dresden'

    Then client A has record "record" with path "city" and data 'Berlin'

  Scenario: Creates and discards twice in a row
    When client A discards record "record"
      Then client A gets notified of record "record" getting discarded

    When client A gets the record "record"
      And client A discards record "record"
      Then client A gets notified of record "record" getting discarded
