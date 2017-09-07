@records @write-ack
Feature: Record write acknowledgement

  Background:
    Given client A connects and logs into server 1
      And client B connects and logs into server 1
      And client C connects and logs into server 2
      And client D connects and logs into server 3
      And all clients get the record "writeRecord"
      And all clients require write acknowledgements for record "writeRecord"

  Scenario: Receives acknowledgement that set worked
    When client A sets the record "writeRecord" and path "user.firstname" with data 'Bob'
    Then client A is told that the record "writeRecord" was set without error
    When client A sets the record "writeRecord" and path "user.firstname" with data 'Alex'
    Then client A is told that the record "writeRecord" was set without error
    When client B sets the record "writeRecord" and path "user.firstname" with data 'Charlie'
    Then client B is told that the record "writeRecord" was set without error
    Then all clients have record "writeRecord" with path "user.firstname" and data 'Charlie'

  @write-acks-unhappy
  Scenario: Connection goes down and clients are notified of write failure immediately
    Given server 1 goes down
    When client A sets the record "writeRecord" and path "user.firstname" with data 'Jeff'
      Then client A is told that the record "writeRecord" experienced error "Connection error: error updating record as connection was closed" while setting

    When server 1 comes back up
      And all clients have record "writeRecord" with path "user.firstname" and data 'Jeff'

    Then client A receives at least one "CONNECTION" error "CONNECTION_ERROR"
      And client B receives at least one "CONNECTION" error "CONNECTION_ERROR"


