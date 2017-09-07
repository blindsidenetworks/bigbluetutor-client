@records
Feature: Clients able to set data of a record without being subscribed to it

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3
      And clients B,C,D get the record "set-data-record"

  Scenario: Clients who are subscribed to a record get changes from client not subscribed
    When client A sets the record "set-data-record" without being subscribed with data '{ "user": { "firstname": "Alex" } }'
      Then clients B,C,D have record "set-data-record" with path "user.firstname" and data 'Alex'

  Scenario: Able to set path of record when not subscribed
    Given client A sets the record "set-data-record" without being subscribed with path "user.firstname" and data 'John'
      Then clients B,C,D have record "set-data-record" with path "user.firstname" and data 'John'

  Scenario: Clients able to use write acknowledgements without being subscribed
    When client A sets the record "set-data-record" without being subscribed with data '{ "user": { "firstname": "Ben" } }' and requires write acknowledgement
      Then client A is told that the record "set-data-record" was set without error
      Then clients B,C,D have record "set-data-record" with path "user.firstname" and data 'Ben'

  Scenario: Record is created if it doesn't exist before write
    When client A sets the record "not-yet-existant" without being subscribed with data '{ "user": { "firstname": "Alex" } }'
      And clients B,C,D get the record "not-yet-existant"
      Then clients B,C,D have record "not-yet-existant" with path "user.firstname" and data 'Alex'

  Scenario: Able to set record when subscribed
    Given client A gets the record "subscribed-record"
      When client A sets the record "subscribed-record" without being subscribed with data '{ "user": { "firstname": "Alex" } }'
      And clients B,C,D get the record "subscribed-record"
      Then all clients have record "subscribed-record" with path "user.firstname" and data 'Alex'
