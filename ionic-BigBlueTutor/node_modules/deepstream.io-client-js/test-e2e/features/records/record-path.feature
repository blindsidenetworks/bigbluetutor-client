@records
Feature: Record

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3

    And all clients get the record "record"
      And client A sets the record "record" with data '{ "user": { "firstname": "John" } }'

  Scenario: Setting a records path to null
    When client A sets the record "record" and path "user.firstname" with data 'null'
    Then all clients have record "record" with path "user.firstname" and data 'null'

  Scenario: Setting a records leaf path to undefined deletes it
    When client A sets the record "record" and path "user.firstname" with data 'undefined'
    Then all clients have record "record" with data '{ "user": {} }'

  Scenario: Setting a leaf path to undefined deletes it
    Given all clients subscribe to record "record"
      And all clients subscribe to record "record" with path "user.firstname"

    When client A sets the record "record" and path "user.firstname" with data 'Dave'

    Then all clients receive an update for record "record" with data '{ "user": { "firstname": "Dave" } }'
      And all clients receive an update for record "record" and path "user.firstname" with data 'Dave'

  Scenario: Setting a branch path to undefined deletes it
    Given client A sets the record "record" and path "objectToDelete" with data '{ "deleteMe": { "key": "value" } }'
      And all clients subscribe to record "record"
      And all clients subscribe to record "record" with path "objectToDelete"

    When client A sets the record "record" and path "objectToDelete" with data 'undefined'

    Then all clients receive an update for record "record" with data '{ "user": { "firstname": "John" } }'
      And all clients receive an update for record "record" and path "objectToDelete" with data 'undefined'

  #Scenario: Setting an array index to undefined sets it as undefined
  #  Given client A sets the record "record" and path "arrayToDeleteFrom" with data '[ {}, {}, {}, {} ]'
  #    And all clients subscribe to record "record"
  #    And all clients subscribe to record "record" with path "arrayToDeleteFrom"

  #  When client A sets the record "record" and path "arrayToDeleteFrom.2" with data 'undefined'

  #  Then all clients receive an update for record "record" with data '{ "user": { "firstname": "John" },"arrayToDeleteFrom": [ {}, {}, null, {} ] }'
  #    And all clients receive an update for record "record" and path "arrayToDeleteFrom" with data '[ {}, {}, null, {} ]'
