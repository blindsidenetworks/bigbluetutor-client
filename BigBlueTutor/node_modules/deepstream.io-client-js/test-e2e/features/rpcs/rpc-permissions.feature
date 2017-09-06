@rpcs @permissions
Feature: RPC providing and calling on single + across multiple nodes

  Background:
    Given "complex" permissions are used
      And client A connects and logs into server 1
      And client B connects and logs into server 2

  Scenario: Clients subscribe to open RPCs
    Given client A provides the RPC "double"
    When client B calls the RPC "double" with arguments "7"
    Then client B receives a response for RPC "double" with data "14"

  Scenario: Only allows a to provide and b to request
    Given client A provides the RPC "a-provide-b-request"
    When client B calls the RPC "a-provide-b-request" with arguments 7
    Then client B receives a response for RPC "a-provide-b-request" with data 21

  Scenario: Denies b to provide
    Given client B provides the RPC "a-provide-b-request"
    Then client B receives "RPC" error "MESSAGE_DENIED"

  Scenario: Denies a to call
    Given client A calls the RPC "a-provide-b-request" with arguments 7
    Then client A receives a response for RPC "a-provide-b-request" with error "MESSAGE_DENIED"

  Scenario: Deny RPCs without full data
    Given client B provides the RPC "only-full-user-data"
    Given client A calls the RPC "only-full-user-data" with arguments {}
    Then client A receives a response for RPC "only-full-user-data" with error "MESSAGE_DENIED"

  Scenario: Deny RPCs with incomplete data
    Given client B provides the RPC "only-full-user-data"
    Given client A calls the RPC "only-full-user-data" with arguments { "firstname": "John" }
    Then client A receives a response for RPC "only-full-user-data" with error "MESSAGE_DENIED"

  Scenario: Allow rpcs with full data
    Given client B provides the RPC "only-full-user-data"
    Given client A calls the RPC "only-full-user-data" with arguments { "firstname": "Wolfram", "lastname": "Hempel" }
    Then client A receives a response for RPC "only-full-user-data" with data "ok"
